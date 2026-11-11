#!/usr/bin/env bash
#
# Provision or rotate a scoped IAM deployment token for a CIS 133JS student.
# Each student IAM user is strictly locked to s3://<bucket>/<student-slug>/*
# plus CloudFront invalidation on the shared distribution.
#
# Usage:
#   ./infra/scripts/issue-student-token.sh --slug <site-slug> --dry-run [--repo <owner/repo>] [--rotate]
#   ./infra/scripts/issue-student-token.sh --slug <site-slug> --create-secret [--rotate]
#   ./infra/scripts/issue-student-token.sh --slug <site-slug> --repo <owner/repo> --push-secret [--rotate]
#
# Examples:
#   ./infra/scripts/issue-student-token.sh --slug phillips --repo mphillips0406/phillips-cocc-js --dry-run
#   ./infra/scripts/issue-student-token.sh --slug phillips --repo mphillips0406/phillips-cocc-js --push-secret
#   ./infra/scripts/issue-student-token.sh --slug phillips --repo mphillips0406/phillips-cocc-js --push-secret --rotate
#   ./infra/scripts/issue-student-token.sh --slug phillips --create-secret

set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-artzt-cocc}"
AWS_REGION="${AWS_REGION:-us-west-2}"
STACK_NAME="Cis133jsStudentHostingStack"

STUDENT_SLUG=""
GH_REPO=""
ACTION_MODE=""
ACTION_COUNT=0
ROTATE_KEYS=0

usage() {
  cat <<EOF
Usage:
  $(basename "$0") --slug <site-slug> --dry-run [--repo <owner/repo>] [--rotate]
  $(basename "$0") --slug <site-slug> --create-secret [--rotate]
  $(basename "$0") --slug <site-slug> --repo <owner/repo> --push-secret [--rotate]

Required arguments:
  --slug <site-slug>    Explicit student site slug (lowercase alphanumeric/hyphens, e.g. 'phillips')

Required action flag (choose exactly one):
  --dry-run             Verify AWS stack, IAM user state, and GitHub repo access without making changes
  --create-secret       Create/update IAM user + scoped policy and mint an AWS access key (prints to stdout)
  --push-secret         Create/update IAM user + scoped policy, mint key, and push secrets to --repo via 'gh'

Options:
  --repo <owner/repo>   Explicit GitHub repository (required with --push-secret; optional with --dry-run)
  --rotate              Replace existing IAM access key(s) for this student user
  -h, --help            Show this help message
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --slug)
      if [[ $# -lt 2 || -z "${2:-}" || "${2:-}" == -* ]]; then
        echo "Error: --slug requires a <site-slug> value." >&2
        usage
        exit 1
      fi
      STUDENT_SLUG="$2"
      shift 2
      ;;
    --repo)
      if [[ $# -lt 2 || -z "${2:-}" || "${2:-}" == -* ]]; then
        echo "Error: --repo requires an <owner/repo> value." >&2
        usage
        exit 1
      fi
      GH_REPO="$2"
      shift 2
      ;;
    --dry-run)
      ACTION_MODE="dry-run"
      ACTION_COUNT=$((ACTION_COUNT + 1))
      shift
      ;;
    --create-secret|--create-secrets)
      ACTION_MODE="create-secret"
      ACTION_COUNT=$((ACTION_COUNT + 1))
      shift
      ;;
    --push-secret|--push-secrets)
      ACTION_MODE="push-secret"
      ACTION_COUNT=$((ACTION_COUNT + 1))
      shift
      ;;
    --rotate)
      ROTATE_KEYS=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    -*)
      echo "Error: Unknown option '$1'" >&2
      usage
      exit 1
      ;;
    *)
      echo "Error: Unexpected positional argument '$1'. Pass --slug <site-slug> explicitly." >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$STUDENT_SLUG" ]]; then
  echo "Error: --slug <site-slug> is required." >&2
  usage
  exit 1
fi

if [[ "$STUDENT_SLUG" =~ -cocc-js$ ]]; then
  echo "Error: --slug must be the site slug only (e.g. '${STUDENT_SLUG%-cocc-js}'), not the repo name ('$STUDENT_SLUG')." >&2
  exit 1
fi

if [[ ! "$STUDENT_SLUG" =~ ^[a-z0-9]([a-z0-9-]*[a-z0-9])?$ ]]; then
  echo "Error: Invalid --slug '$STUDENT_SLUG' (must be lowercase alphanumeric/hyphens and cannot start or end with a hyphen)." >&2
  exit 1
fi

if [[ "$ACTION_COUNT" -eq 0 ]]; then
  echo "Error: Must specify an explicit action flag: --dry-run, --create-secret, or --push-secret." >&2
  usage
  exit 1
fi

if [[ "$ACTION_COUNT" -gt 1 ]]; then
  echo "Error: Specify only one action flag (--dry-run, --create-secret, or --push-secret)." >&2
  usage
  exit 1
fi

if [[ "$ACTION_MODE" == "push-secret" && -z "$GH_REPO" ]]; then
  echo "Error: --push-secret requires --repo <owner/repo>." >&2
  usage
  exit 1
fi

if [[ "$ACTION_MODE" == "create-secret" && -n "$GH_REPO" ]]; then
  echo "Error: --repo cannot be combined with --create-secret (use --push-secret to push to GitHub, or omit --repo)." >&2
  usage
  exit 1
fi

if [[ -n "$GH_REPO" ]]; then
  if [[ ! "$GH_REPO" =~ ^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$ ]]; then
    echo "Error: Invalid --repo '$GH_REPO' (expected format: <owner>/<repo>)." >&2
    exit 1
  fi

  echo "==> Verifying GitHub repository access for '$GH_REPO'..."
  if ! gh repo view "$GH_REPO" --json nameWithOwner >/dev/null 2>&1; then
    echo "Error: Cannot access GitHub repository '$GH_REPO' via 'gh'. Verify the repo name and 'gh auth status'." >&2
    exit 1
  fi
fi

echo "==> Querying CloudFormation stack '$STACK_NAME' (profile: $AWS_PROFILE)..."
ACCOUNT_ID="$(aws sts get-caller-identity --profile "$AWS_PROFILE" --query Account --output text)"

STACK_OUTPUTS="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --profile "$AWS_PROFILE" \
  --query 'Stacks[0].Outputs' \
  --output json)"

get_output() {
  local key="$1"
  printf '%s' "$STACK_OUTPUTS" | node -e '
    const outputs = JSON.parse(require("fs").readFileSync(0, "utf8"));
    const match = outputs.find(o => o.OutputKey === process.argv[1]);
    if (!match) process.exit(1);
    process.stdout.write(match.OutputValue);
  ' "$key"
}

BUCKET_NAME="$(get_output BucketName)"
DISTRIBUTION_ID="$(get_output DistributionId)"
BASE_URL="$(get_output BaseUrl)"

IAM_USER="cocc-student-${STUDENT_SLUG}"
POLICY_NAME="Cis133jsStudentDeploy-${STUDENT_SLUG}"

USER_EXISTS=0
EXISTING_KEYS=()
if aws iam get-user --user-name "$IAM_USER" --profile "$AWS_PROFILE" >/dev/null 2>&1; then
  USER_EXISTS=1
  if ! RAW_KEYS="$(aws iam list-access-keys \
    --user-name "$IAM_USER" \
    --profile "$AWS_PROFILE" \
    --query 'sort_by(AccessKeyMetadata, &CreateDate)[].AccessKeyId' \
    --output text)"; then
    echo "Error: Failed to list access keys for IAM user '$IAM_USER'." >&2
    exit 1
  fi
  mapfile -t EXISTING_KEYS < <(printf '%s\n' "$RAW_KEYS" | tr '\t' '\n' | grep -v '^$' | grep -v '^None$' || true)
fi

if [[ "$ACTION_MODE" == "dry-run" ]]; then
  if [[ "$USER_EXISTS" -eq 1 ]]; then
    USER_STATUS="exists"
  else
    USER_STATUS="does not exist (would be created)"
  fi

  if [[ "${#EXISTING_KEYS[@]}" -eq 0 ]]; then
    KEYS_STATUS="none (1 new key would be created)"
  elif [[ "$ROTATE_KEYS" -eq 1 ]]; then
    KEYS_STATUS="${#EXISTING_KEYS[@]} existing (${EXISTING_KEYS[*]}) -> would be rotated"
  else
    KEYS_STATUS="${#EXISTING_KEYS[@]} existing (${EXISTING_KEYS[*]}) -> BLOCKED without --rotate"
  fi

  cat <<EOF

================================================================================
DRY RUN — No changes made to AWS or GitHub
================================================================================
Student Slug:                ${STUDENT_SLUG}
App URL:                     ${BASE_URL}/${STUDENT_SLUG}
S3 Prefix:                   s3://${BUCKET_NAME}/${STUDENT_SLUG}/
CloudFront Distribution ID:  ${DISTRIBUTION_ID}
IAM User:                    ${IAM_USER} (${USER_STATUS})
Inline Policy:               ${POLICY_NAME}
IAM Access Keys:             ${KEYS_STATUS}
GitHub Repository:           ${GH_REPO:-<none>}
================================================================================
EOF
  exit 0
fi

if [[ "${#EXISTING_KEYS[@]}" -gt 0 && "$ROTATE_KEYS" -eq 0 ]]; then
  echo "Error: IAM user '$IAM_USER' already has ${#EXISTING_KEYS[@]} access key(s): ${EXISTING_KEYS[*]}." >&2
  echo "Re-run with --rotate to replace existing key(s), or --dry-run to inspect." >&2
  exit 1
fi

echo "==> Ensuring IAM user '$IAM_USER' exists..."
if [[ "$USER_EXISTS" -eq 0 ]]; then
  aws iam create-user \
    --user-name "$IAM_USER" \
    --tags Key=Course,Value=CIS133JS Key=Student,Value="$STUDENT_SLUG" \
    --profile "$AWS_PROFILE" >/dev/null
  echo "    Created IAM user '$IAM_USER'."
else
  echo "    IAM user '$IAM_USER' already exists."
fi

POLICY_DOCUMENT="$(cat <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListOwnStudentPrefixOnly",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}",
      "Condition": {
        "StringLike": {
          "s3:prefix": [
            "${STUDENT_SLUG}",
            "${STUDENT_SLUG}/*"
          ]
        }
      }
    },
    {
      "Sid": "ReadWriteOwnStudentPrefixOnly",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/${STUDENT_SLUG}/*"
    },
    {
      "Sid": "InvalidateCloudFrontCache",
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DISTRIBUTION_ID}"
    }
  ]
}
EOF
)"

echo "==> Attaching scoped inline policy '$POLICY_NAME' (s3://${BUCKET_NAME}/${STUDENT_SLUG}/*)..."
aws iam put-user-policy \
  --user-name "$IAM_USER" \
  --policy-name "$POLICY_NAME" \
  --policy-document "$POLICY_DOCUMENT" \
  --profile "$AWS_PROFILE"

if [[ "$ROTATE_KEYS" -eq 1 ]]; then
  # AWS IAM allows at most 2 keys per user; if 2 already exist, free the oldest slot first
  while [[ "${#EXISTING_KEYS[@]}" -ge 2 ]]; do
    OLDEST_KEY="${EXISTING_KEYS[0]}"
    aws iam delete-access-key \
      --user-name "$IAM_USER" \
      --access-key-id "$OLDEST_KEY" \
      --profile "$AWS_PROFILE"
    echo "    Deleted oldest access key to free IAM slot: $OLDEST_KEY"
    EXISTING_KEYS=("${EXISTING_KEYS[@]:1}")
  done
fi

echo "==> Creating new IAM access key for '$IAM_USER'..."
KEY_JSON="$(aws iam create-access-key \
  --user-name "$IAM_USER" \
  --profile "$AWS_PROFILE" \
  --output json)"

ACCESS_KEY_ID="$(printf '%s' "$KEY_JSON" | node -e '
  const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
  process.stdout.write(data.AccessKey.AccessKeyId);
')"

SECRET_ACCESS_KEY="$(printf '%s' "$KEY_JSON" | node -e '
  const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
  process.stdout.write(data.AccessKey.SecretAccessKey);
')"

cat <<EOF

================================================================================
Student Deployment Provisioned: ${STUDENT_SLUG}
================================================================================
App URL:                     ${BASE_URL}/${STUDENT_SLUG}
S3 Prefix:                   s3://${BUCKET_NAME}/${STUDENT_SLUG}/
CloudFront Distribution ID:  ${DISTRIBUTION_ID}
IAM User:                    ${IAM_USER}

GitHub Repository Secrets:
  STUDENT_SLUG=${STUDENT_SLUG}
  AWS_ACCESS_KEY_ID=${ACCESS_KEY_ID}
  AWS_SECRET_ACCESS_KEY=${SECRET_ACCESS_KEY}
================================================================================
EOF

if [[ "$ACTION_MODE" == "push-secret" ]]; then
  echo "==> Setting GitHub Actions secrets on '$GH_REPO'..."
  printf '%s' "$ACCESS_KEY_ID" | gh secret set AWS_ACCESS_KEY_ID --repo "$GH_REPO"
  printf '%s' "$SECRET_ACCESS_KEY" | gh secret set AWS_SECRET_ACCESS_KEY --repo "$GH_REPO"
  printf '%s' "$STUDENT_SLUG" | gh secret set STUDENT_SLUG --repo "$GH_REPO"
  echo "    Pushed AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and STUDENT_SLUG to $GH_REPO."
fi

if [[ "$ROTATE_KEYS" -eq 1 && "${#EXISTING_KEYS[@]}" -gt 0 ]]; then
  echo "==> Deleting previous access key(s) for '$IAM_USER'..."
  for key_id in "${EXISTING_KEYS[@]}"; do
    aws iam delete-access-key \
      --user-name "$IAM_USER" \
      --access-key-id "$key_id" \
      --profile "$AWS_PROFILE"
    echo "    Deleted previous access key: $key_id"
  done
fi
