#!/usr/bin/env bash
#
# Compare the git-ignored student roster (infra/students.local.json) with the
# cocc-student-* IAM users in the course AWS account, and optionally reconcile them.
#
# Usage:
#   ./infra/scripts/roster-sync.sh --report
#   ./infra/scripts/roster-sync.sh --provision
#   ./infra/scripts/roster-sync.sh --prune [--purge-files] [--yes]
#   ./infra/scripts/roster-sync.sh --teardown [--purge-files] [--yes]
#
# --provision calls issue-student-token.sh --push-secret for each roster slug with no IAM user.
# --prune deletes IAM users whose slug is no longer in the roster.
# --teardown deletes every cocc-student-* IAM user (end of term).
# --purge-files also removes the deleted students' s3://<bucket>/<slug>/ folders, which
# takes their sites offline. Without it, the sites stay up but can no longer be updated.

set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-artzt-cocc}"
AWS_REGION="${AWS_REGION:-us-west-2}"
STACK_NAME="Cis133jsStudentHostingStack"
USER_PREFIX="cocc-student-"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
ROSTER_FILE="${STUDENT_ROSTER:-$SCRIPT_DIR/../students.local.json}"

ACTION_MODE=""
PURGE_FILES=0
ASSUME_YES=0

usage() {
  cat <<EOF
Usage:
  $(basename "$0") --report
  $(basename "$0") --provision
  $(basename "$0") --prune [--purge-files] [--yes]
  $(basename "$0") --teardown [--purge-files] [--yes]

Action flags (choose one):
  --report         List roster slugs, IAM users, and any differences (no changes)
  --provision      Issue tokens (via issue-student-token.sh --push-secret) for roster slugs with no IAM user
  --prune          Delete IAM users whose slug is not in the roster
  --teardown       Delete ALL ${USER_PREFIX}* IAM users (end of term)

Options:
  --purge-files    With --prune/--teardown, also delete each removed student's s3://<bucket>/<slug>/ files
  --yes            Skip the confirmation prompt for --prune/--teardown
  --roster <path>  Student roster JSON (default: infra/students.local.json, or \$STUDENT_ROSTER)
  -h, --help       Show this help message
EOF
}

set_action() {
  if [[ -n "$ACTION_MODE" ]]; then
    echo "Error: Specify only one action flag." >&2
    usage
    exit 1
  fi
  ACTION_MODE="$1"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --report) set_action report; shift ;;
    --provision) set_action provision; shift ;;
    --prune) set_action prune; shift ;;
    --teardown) set_action teardown; shift ;;
    --purge-files) PURGE_FILES=1; shift ;;
    --yes) ASSUME_YES=1; shift ;;
    --roster)
      if [[ $# -lt 2 || -z "${2:-}" || "${2:-}" == -* ]]; then
        echo "Error: --roster requires a <path> value." >&2
        usage
        exit 1
      fi
      ROSTER_FILE="$2"
      shift 2
      ;;
    -h|--help) usage; exit 0 ;;
    *)
      echo "Error: Unknown argument '$1'" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$ACTION_MODE" ]]; then
  echo "Error: Must specify an action flag: --report, --provision, --prune, or --teardown." >&2
  usage
  exit 1
fi

if [[ "$PURGE_FILES" -eq 1 && "$ACTION_MODE" != "prune" && "$ACTION_MODE" != "teardown" ]]; then
  echo "Error: --purge-files only applies to --prune or --teardown." >&2
  exit 1
fi

# Teardown works from IAM alone, so it does not need a roster
ROSTER_SLUGS=()
if [[ "$ACTION_MODE" != "teardown" ]]; then
  node "$SCRIPT_DIR/roster.mjs" "$ROSTER_FILE" validate
  mapfile -t ROSTER_SLUGS < <(node "$SCRIPT_DIR/roster.mjs" "$ROSTER_FILE" slugs | grep -v '^$' || true)
fi

echo "==> Listing ${USER_PREFIX}* IAM users (profile: $AWS_PROFILE)..."
RAW_USERS="$(aws iam list-users \
  --profile "$AWS_PROFILE" \
  --query "Users[?starts_with(UserName, '${USER_PREFIX}')].UserName" \
  --output text)"
IAM_SLUGS=()
mapfile -t IAM_SLUGS < <(printf '%s\n' "$RAW_USERS" | tr '\t' '\n' | grep -v '^$' | grep -v '^None$' | sed "s/^${USER_PREFIX}//" | sort || true)

contains() {
  local needle="$1"
  shift
  local item
  for item in "$@"; do
    [[ "$item" == "$needle" ]] && return 0
  done
  return 1
}

MISSING=() # in roster, no IAM user
EXTRA=()   # IAM user, not in roster
for slug in "${ROSTER_SLUGS[@]}"; do
  contains "$slug" "${IAM_SLUGS[@]}" || MISSING+=("$slug")
done
for slug in "${IAM_SLUGS[@]}"; do
  contains "$slug" "${ROSTER_SLUGS[@]}" || EXTRA+=("$slug")
done

cat <<EOF

================================================================================
Roster vs. IAM
================================================================================
Roster slugs (${#ROSTER_SLUGS[@]}):            ${ROSTER_SLUGS[*]:-<none>}
IAM users (${#IAM_SLUGS[@]}):               ${IAM_SLUGS[*]:-<none>}
Missing IAM user:            ${MISSING[*]:-<none>}
Not in roster:               ${EXTRA[*]:-<none>}
================================================================================
EOF

if [[ "$ACTION_MODE" == "report" ]]; then
  exit 0
fi

if [[ "$ACTION_MODE" == "provision" ]]; then
  if [[ "${#MISSING[@]}" -eq 0 ]]; then
    echo "Nothing to provision."
    exit 0
  fi
  for slug in "${MISSING[@]}"; do
    echo
    echo "==> Provisioning '$slug'..."
    STUDENT_ROSTER="$ROSTER_FILE" "$SCRIPT_DIR/issue-student-token.sh" --slug "$slug" --push-secret
  done
  exit 0
fi

if [[ "$ACTION_MODE" == "prune" ]]; then
  TARGETS=("${EXTRA[@]}")
else
  TARGETS=("${IAM_SLUGS[@]}")
fi

if [[ "${#TARGETS[@]}" -eq 0 ]]; then
  echo "No IAM users to delete."
  exit 0
fi

BUCKET_NAME=""
if [[ "$PURGE_FILES" -eq 1 ]]; then
  BUCKET_NAME="$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$AWS_REGION" \
    --profile "$AWS_PROFILE" \
    --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
    --output text)"
fi

echo
echo "About to delete these IAM users (with their access keys and inline policies):"
for slug in "${TARGETS[@]}"; do
  echo "  ${USER_PREFIX}${slug}"
done
if [[ "$PURGE_FILES" -eq 1 ]]; then
  echo "and delete their site files under s3://${BUCKET_NAME}/<slug>/ (sites go offline)."
fi

if [[ "$ASSUME_YES" -eq 0 ]]; then
  read -r -p "Type 'delete' to continue: " CONFIRM
  if [[ "$CONFIRM" != "delete" ]]; then
    echo "Aborted; no changes made."
    exit 1
  fi
fi

for slug in "${TARGETS[@]}"; do
  IAM_USER="${USER_PREFIX}${slug}"
  echo "==> Deleting IAM user '$IAM_USER'..."

  for key_id in $(aws iam list-access-keys --user-name "$IAM_USER" --profile "$AWS_PROFILE" \
    --query 'AccessKeyMetadata[].AccessKeyId' --output text); do
    aws iam delete-access-key --user-name "$IAM_USER" --access-key-id "$key_id" --profile "$AWS_PROFILE"
    echo "    Deleted access key $key_id"
  done

  for policy_name in $(aws iam list-user-policies --user-name "$IAM_USER" --profile "$AWS_PROFILE" \
    --query 'PolicyNames[]' --output text); do
    aws iam delete-user-policy --user-name "$IAM_USER" --policy-name "$policy_name" --profile "$AWS_PROFILE"
    echo "    Deleted inline policy $policy_name"
  done

  aws iam delete-user --user-name "$IAM_USER" --profile "$AWS_PROFILE"
  echo "    Deleted user $IAM_USER"

  if [[ "$PURGE_FILES" -eq 1 ]]; then
    aws s3 rm "s3://${BUCKET_NAME}/${slug}/" --recursive --region "$AWS_REGION" --profile "$AWS_PROFILE" >/dev/null
    echo "    Deleted s3://${BUCKET_NAME}/${slug}/"
  fi
done

echo
echo "Done. Run deploy-root-index.sh --deploy to refresh the class directory page."
