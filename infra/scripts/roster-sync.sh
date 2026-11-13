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
# --provision calls issue-student-token.sh --push-secret for each roster slug with no IAM user,
# and re-issues (with --rotate) any student whose provisioning is incomplete: no inline policy,
# no access key, missing repo secrets, or repo secrets older than the newest access key.
# --prune deletes IAM users whose slug is no longer in the roster.
# --teardown deletes every cocc-student-* IAM user (end of term).
# --purge-files also removes the deleted students' s3://<bucket>/<slug>/ folders and
# invalidates their CloudFront paths, which takes their sites offline. Without it, the
# sites stay up but can no longer be updated. Files are purged and the invalidation has
# completed before any IAM user is deleted, so an interrupted run can simply be rerun.

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
  --provision      Issue tokens (via issue-student-token.sh --push-secret) for roster slugs with no IAM
                   user, and re-issue tokens (with --rotate) for incomplete ones
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

to_epoch() {
  date -d "$1" +%s
}

# Prints "ok", or the reason a roster student's existing IAM user isn't fully provisioned.
# The issuer creates the user before it attaches the policy, mints the key, and pushes the
# secrets, so a failure partway through leaves a user that only looks provisioned.
provisioning_status() {
  local slug="$1"
  local iam_user="${USER_PREFIX}${slug}"
  local policy_name="Cis133jsStudentDeploy-${slug}"
  local repo newest_key secrets secret_name secret_updated

  if ! aws iam get-user-policy --user-name "$iam_user" --policy-name "$policy_name" \
    --profile "$AWS_PROFILE" >/dev/null 2>&1; then
    echo "no inline policy"
    return
  fi

  newest_key="$(aws iam list-access-keys --user-name "$iam_user" --profile "$AWS_PROFILE" \
    --query 'max_by(AccessKeyMetadata, &CreateDate).CreateDate' --output text)"
  if [[ -z "$newest_key" || "$newest_key" == "None" ]]; then
    echo "no access key"
    return
  fi

  repo="$(node "$SCRIPT_DIR/roster.mjs" "$ROSTER_FILE" get "$slug" repo)"
  if ! secrets="$(gh secret list --repo "$repo" --json name,updatedAt \
    --jq '.[] | "\(.name) \(.updatedAt)"' 2>/dev/null)"; then
    echo "cannot read secrets on $repo"
    return
  fi

  for secret_name in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY STUDENT_SLUG; do
    secret_updated="$(printf '%s\n' "$secrets" | awk -v name="$secret_name" '$1 == name { print $2 }')"
    if [[ -z "$secret_updated" ]]; then
      echo "secret $secret_name missing on $repo"
      return
    fi
    # the key secrets must have been pushed after the newest key was minted
    if [[ "$secret_name" != "STUDENT_SLUG" && "$(to_epoch "$secret_updated")" -lt "$(to_epoch "$newest_key")" ]]; then
      echo "secret $secret_name on $repo is older than the newest access key"
      return
    fi
  done

  echo "ok"
}

MISSING=()    # in roster, no IAM user
INCOMPLETE=() # in roster, IAM user exists but provisioning didn't finish
EXTRA=()      # IAM user, not in roster
INCOMPLETE_REASONS=()
if [[ "$ACTION_MODE" == "report" || "$ACTION_MODE" == "provision" ]]; then
  for slug in "${ROSTER_SLUGS[@]}"; do
    if ! contains "$slug" "${IAM_SLUGS[@]}"; then
      MISSING+=("$slug")
      continue
    fi
    status="$(provisioning_status "$slug")"
    if [[ "$status" != "ok" ]]; then
      INCOMPLETE+=("$slug")
      INCOMPLETE_REASONS+=("  ${slug}: ${status}")
    fi
  done
fi
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
Incomplete provisioning:     ${INCOMPLETE[*]:-<none>}
Not in roster:               ${EXTRA[*]:-<none>}
================================================================================
EOF

if [[ "${#INCOMPLETE_REASONS[@]}" -gt 0 ]]; then
  printf '%s\n' "Incomplete provisioning details:" "${INCOMPLETE_REASONS[@]}"
fi

if [[ "$ACTION_MODE" == "report" ]]; then
  exit 0
fi

if [[ "$ACTION_MODE" == "provision" ]]; then
  if [[ "${#MISSING[@]}" -eq 0 && "${#INCOMPLETE[@]}" -eq 0 ]]; then
    echo "Nothing to provision."
    exit 0
  fi
  for slug in "${MISSING[@]}"; do
    echo
    echo "==> Provisioning '$slug'..."
    STUDENT_ROSTER="$ROSTER_FILE" "$SCRIPT_DIR/issue-student-token.sh" --slug "$slug" --push-secret
  done
  # --rotate mints and pushes a fresh key, then deletes any key left behind by the failed run
  for slug in "${INCOMPLETE[@]}"; do
    echo
    echo "==> Re-issuing incomplete '$slug'..."
    STUDENT_ROSTER="$ROSTER_FILE" "$SCRIPT_DIR/issue-student-token.sh" --slug "$slug" --push-secret --rotate
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
DISTRIBUTION_ID=""
if [[ "$PURGE_FILES" -eq 1 ]]; then
  get_stack_output() {
    aws cloudformation describe-stacks \
      --stack-name "$STACK_NAME" \
      --region "$AWS_REGION" \
      --profile "$AWS_PROFILE" \
      --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" \
      --output text
  }
  BUCKET_NAME="$(get_stack_output BucketName)"
  DISTRIBUTION_ID="$(get_stack_output DistributionId)"
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

# Purge files and evict CloudFront's cached copies (assets are cached for a year) before
# touching IAM. TARGETS comes from the existing IAM users, so if this part fails, the users
# are still there and rerunning the same command retries the purge.
if [[ "$PURGE_FILES" -eq 1 ]]; then
  INVALIDATION_PATHS=()
  for slug in "${TARGETS[@]}"; do
    echo "==> Deleting s3://${BUCKET_NAME}/${slug}/..."
    aws s3 rm "s3://${BUCKET_NAME}/${slug}/" --recursive --region "$AWS_REGION" --profile "$AWS_PROFILE" >/dev/null
    INVALIDATION_PATHS+=("/${slug}" "/${slug}/*")
  done

  echo "==> Invalidating CloudFront paths: ${INVALIDATION_PATHS[*]}"
  INVALIDATION_ID="$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "${INVALIDATION_PATHS[@]}" \
    --profile "$AWS_PROFILE" \
    --query 'Invalidation.Id' \
    --output text)"
  echo "    Waiting for invalidation $INVALIDATION_ID to complete (usually a few minutes)..."
  aws cloudfront wait invalidation-completed \
    --distribution-id "$DISTRIBUTION_ID" \
    --id "$INVALIDATION_ID" \
    --profile "$AWS_PROFILE"
  echo "    Invalidation complete; sites are offline."
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
done

echo
echo "Done. Run deploy-root-index.sh --deploy to refresh the class directory page."
