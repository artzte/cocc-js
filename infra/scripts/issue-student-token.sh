#!/usr/bin/env bash
#
# Provision or rotate a scoped IAM deployment token for a CIS 133JS student.
# Each student IAM user is strictly locked to s3://<bucket>/<student-slug>/*
# plus CloudFront invalidation on the shared distribution.
#
# Usage:
#   ./infra/scripts/issue-student-token.sh <student-slug> [--repo <owner/repo>] [--push-secrets] [--rotate]
#
# Examples:
#   ./infra/scripts/issue-student-token.sh phillips
#   ./infra/scripts/issue-student-token.sh phillips --push-secrets
#   ./infra/scripts/issue-student-token.sh phillips --repo mphillips0406/phillips-cocc-js --rotate

set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-artzt-cocc}"
AWS_REGION="${AWS_REGION:-us-west-2}"
STACK_NAME="Cis133jsStudentHostingStack"

STUDENT_SLUG=""
GH_REPO=""
PUSH_SECRETS=0
ROTATE_KEYS=0

usage() {
  cat <<EOF
Usage: $(basename "$0") <student-slug> [options]

Options:
  --repo <owner/repo>   GitHub repository to push secrets to (implies --push-secrets)
  --push-secrets        Push secrets directly to the student's GitHub repo via 'gh secret set'
                        (auto-detects repo from ../../<slug>-cocc-js if --repo is omitted)
  --rotate              Delete any existing IAM access keys for this student before creating a new one
  -h, --help            Show this help message
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo)
      GH_REPO="${2:-}"
      PUSH_SECRETS=1
      shift 2
      ;;
    --push-secrets)
      PUSH_SECRETS=1
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
      if [[ -z "$STUDENT_SLUG" ]]; then
        STUDENT_SLUG="$1"
        shift
      else
        echo "Error: Unexpected argument '$1'" >&2
        usage
        exit 1
      fi
      ;;
  esac
done

if [[ -z "$STUDENT_SLUG" ]]; then
  usage
  exit 1
fi

# Normalize slug to lowercase alphanumeric + hyphens
STUDENT_SLUG="$(printf '%s' "$STUDENT_SLUG" | tr '[:upper:]' '[:lower:]' | sed 's/-cocc-js$//')"
if [[ ! "$STUDENT_SLUG" =~ ^[a-z0-9-]+$ ]]; then
  echo "Error: Invalid student slug '$STUDENT_SLUG' (must be lowercase alphanumeric/hyphens)." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Auto-detect GitHub repo from sibling checkout if --push-secrets was requested without --repo
if [[ "$PUSH_SECRETS" -eq 1 && -z "$GH_REPO" ]]; then
  SIBLING_REPO="$WORKSPACE_ROOT/${STUDENT_SLUG}-cocc-js"
  if [[ -d "$SIBLING_REPO/.git" ]]; then
    REMOTE_URL="$(git -C "$SIBLING_REPO" remote get-url origin 2>/dev/null || true)"
    GH_REPO="$(printf '%s' "$REMOTE_URL" | sed -E 's#^(git@github\.com:|https://github\.com/)##; s#\.git$##')"
  fi
  if [[ -z "$GH_REPO" ]]; then
    echo "Error: Could not auto-detect GitHub repo for '$STUDENT_SLUG'. Pass --repo <owner/repo>." >&2
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

echo "==> Ensuring IAM user '$IAM_USER' exists..."
if ! aws iam get-user --user-name "$IAM_USER" --profile "$AWS_PROFILE" >/dev/null 2>&1; then
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
  echo "==> Rotating existing access keys for '$IAM_USER'..."
  EXISTING_KEYS="$(aws iam list-access-keys \
    --user-name "$IAM_USER" \
    --profile "$AWS_PROFILE" \
    --query 'AccessKeyMetadata[].AccessKeyId' \
    --output text)"
  for key_id in $EXISTING_KEYS; do
    if [[ -n "$key_id" && "$key_id" != "None" ]]; then
      aws iam delete-access-key \
        --user-name "$IAM_USER" \
        --access-key-id "$key_id" \
        --profile "$AWS_PROFILE"
      echo "    Deleted old access key: $key_id"
    fi
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

if [[ "$PUSH_SECRETS" -eq 1 ]]; then
  echo "==> Setting GitHub Actions secrets on '$GH_REPO'..."
  printf '%s' "$ACCESS_KEY_ID" | gh secret set AWS_ACCESS_KEY_ID --repo "$GH_REPO"
  printf '%s' "$SECRET_ACCESS_KEY" | gh secret set AWS_SECRET_ACCESS_KEY --repo "$GH_REPO"
  printf '%s' "$STUDENT_SLUG" | gh secret set STUDENT_SLUG --repo "$GH_REPO"
  echo "    Pushed AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and STUDENT_SLUG to $GH_REPO."
fi

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
