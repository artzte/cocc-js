#!/usr/bin/env bash
#
# Deploy infra/site/index.html to the root of the CIS 133JS student hosting
# S3 bucket (s3://<bucket>/index.html) and invalidate CloudFront for / and /index.html.
#
# Usage:
#   ./infra/scripts/deploy-root-index.sh --dry-run
#   ./infra/scripts/deploy-root-index.sh --deploy

set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-artzt-cocc}"
AWS_REGION="${AWS_REGION:-us-west-2}"
STACK_NAME="Cis133jsStudentHostingStack"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
INDEX_FILE="$SCRIPT_DIR/../site/index.html"

ACTION_MODE=""

usage() {
  cat <<EOF
Usage:
  $(basename "$0") --dry-run
  $(basename "$0") --deploy

Required action flag (choose one):
  --dry-run   Verify stack outputs and preview the upload target without modifying S3/CloudFront
  --deploy    Upload infra/site/index.html to s3://<bucket>/index.html and invalidate CloudFront
  -h, --help  Show this help message
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      if [[ -n "$ACTION_MODE" ]]; then
        echo "Error: Specify only one of --dry-run or --deploy." >&2
        usage
        exit 1
      fi
      ACTION_MODE="dry-run"
      shift
      ;;
    --deploy)
      if [[ -n "$ACTION_MODE" ]]; then
        echo "Error: Specify only one of --dry-run or --deploy." >&2
        usage
        exit 1
      fi
      ACTION_MODE="deploy"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Error: Unknown argument '$1'" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$ACTION_MODE" ]]; then
  echo "Error: Must specify --dry-run or --deploy." >&2
  usage
  exit 1
fi

if [[ ! -f "$INDEX_FILE" ]]; then
  echo "Error: Root index file not found at '$INDEX_FILE'." >&2
  exit 1
fi

echo "==> Querying CloudFormation stack '$STACK_NAME' (profile: $AWS_PROFILE)..."
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

if [[ "$ACTION_MODE" == "dry-run" ]]; then
  cat <<EOF

================================================================================
DRY RUN — Root Index Deployment
================================================================================
Source File:                 ${INDEX_FILE}
S3 Destination:              s3://${BUCKET_NAME}/index.html
CloudFront Distribution ID:  ${DISTRIBUTION_ID}
Live Root URL:               ${BASE_URL}/
================================================================================
EOF
  exit 0
fi

echo "==> Uploading '$INDEX_FILE' to s3://${BUCKET_NAME}/index.html..."
aws s3 cp "$INDEX_FILE" "s3://${BUCKET_NAME}/index.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "public, max-age=0, must-revalidate" \
  --region "$AWS_REGION" \
  --profile "$AWS_PROFILE"

echo "==> Creating CloudFront invalidation for '/' and '/index.html'..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/" "/index.html" \
  --profile "$AWS_PROFILE" \
  >/dev/null

cat <<EOF

================================================================================
Root Index Deployed
================================================================================
Live Root URL:               ${BASE_URL}/
S3 Object:                   s3://${BUCKET_NAME}/index.html
CloudFront Distribution ID:  ${DISTRIBUTION_ID}
================================================================================
EOF
