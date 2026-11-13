# Hosting Operations (Instructor)

These are my notes for running the final project hosting. Students don't need any of this; their
guide is [`README.md`](README.md).

All commands run from the repo root with the `artzt-cocc` AWS profile (override with `AWS_PROFILE`)
and an authenticated `gh`.

## The student roster

The scripts read the class list from `infra/students.local.json`. That file holds student names and
GitHub repos, so it is git-ignored and must never be committed to this public repo. Keep a copy in
1Password; it is the only record of which repo belongs to which slug.

Start from the example:

```bash
cp infra/students.example.json infra/students.local.json
```

Each entry has three fields:

```json
{ "slug": "jdoe", "repo": "jdoe-gh/jdoe-cocc-js", "title": "Weather Dashboard" }
```

- `slug` is the site path (`/jdoe`) and the IAM user suffix (`cocc-student-jdoe`). It's usually the
  student's last name, but any lowercase slug works if a student would rather not use their name.
- `repo` is where `--push-secret` puts the deployment secrets.
- `title` is the project name shown on the class directory page.

To use a roster somewhere else, pass `--roster <path>` or set `STUDENT_ROSTER`.

## Search engines

CloudFront adds `X-Robots-Tag: noindex, nofollow` to every response, and the directory page also has
a `<meta name="robots">` tag. There is no `robots.txt` on purpose: crawlers that are blocked from
fetching a page never see its noindex header.

## Initial setup

```bash
cd infra
npm install
npx cdk bootstrap --profile artzt-cocc   # once per account/region
npm run diff                             # review changes
npm run deploy
```

## Adding a student

1. Add their entry to `infra/students.local.json`.
2. Issue their token and push it to their repo:

   ```bash
   ./infra/scripts/issue-student-token.sh --slug jdoe --dry-run
   ./infra/scripts/issue-student-token.sh --slug jdoe --push-secret
   ```

   Or provision everyone in the roster who doesn't have an IAM user yet:

   ```bash
   ./infra/scripts/roster-sync.sh --report
   ./infra/scripts/roster-sync.sh --provision
   ```

3. Refresh the directory page:

   ```bash
   ./infra/scripts/deploy-root-index.sh --dry-run
   ./infra/scripts/deploy-root-index.sh --deploy
   ```

To preview the page without uploading it:

```bash
node infra/scripts/roster.mjs infra/students.local.json render-index infra/site/index.html > /tmp/index.html
```

## Rotating a key

```bash
./infra/scripts/issue-student-token.sh --slug jdoe --push-secret --rotate
```

This mints a new key, pushes it to the repo, and then deletes the old one.

## Removing a student

1. Remove their entry from `infra/students.local.json`.
2. Delete their IAM user. Add `--purge-files` to take their site offline as well:

   ```bash
   ./infra/scripts/roster-sync.sh --report
   ./infra/scripts/roster-sync.sh --prune [--purge-files]
   ```

   `--purge-files` deletes the S3 files, invalidates the student's CloudFront paths, and waits for
   the invalidation to finish (a few minutes) before deleting any IAM user. If it fails partway,
   rerun the same command.

3. Refresh the directory page with `deploy-root-index.sh --deploy`.

## End of term

1. Delete every student IAM user. Their sites stay up (read-only) unless you add `--purge-files`:

   ```bash
   ./infra/scripts/roster-sync.sh --teardown [--purge-files]
   ```

2. To remove the hosting entirely, run `npm run cdk -- destroy --profile artzt-cocc` from `infra/`.
   The bucket has a `RETAIN` removal policy, so CloudFormation leaves it behind; empty and delete it
   by hand afterward if you want it gone.
3. Archive `infra/students.local.json` in 1Password and delete the local copy.
