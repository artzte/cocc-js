# CIS 133JS — Final Project Hosting Infrastructure (AWS CDK)

This folder defines the AWS infrastructure that hosts student final projects (`projects/final`)
under a shared CloudFront distribution and S3 bucket in the `artzt-cocc` AWS account
(`081028362911`).

## Deployed Resources (`us-west-2`)

- **Base URL:** `https://d2zap10oyizxcd.cloudfront.net/<student-slug>`
- **S3 Bucket:** `cocc-cis133js-projects-081028362911` (private; served via CloudFront Origin Access
  Control)
- **CloudFront Distribution ID:** `ERB30548CV2DP`
- **CloudFront Function (`viewer-request`):** `cocc-cis133js-student-spa-router`

## How Per-Student SPA Routing Works

Each student's built application (`projects/final/dist`) is uploaded to
`s3://cocc-cis133js-projects-081028362911/<student-slug>/`.

When a browser requests a URL from CloudFront, the `cocc-cis133js-student-spa-router`
`viewer-request` function inspects the URI:

1. **Static Assets (has a file extension):** Requests such as `/phillips/assets/index-abc123.js` or
   `/phillips/style.css` pass straight through to S3.
2. **Entry & Client-Side SPA Routes (no file extension):** Requests such as `/phillips`,
   `/phillips/`, `/phillips/about`, or `/phillips/items/42` are rewritten internally to
   `/phillips/index.html` so client-side routers like [Navigo](https://github.com/krasimir/navigo)
   receive the original browser URL and render the matching view.

### Using Navigo in `projects/final`

Because the GitHub Action builds your project with `vite build --base="/<student-slug>/"`, Vite
automatically populates `import.meta.env.BASE_URL` (`/` in local `npm start`, and `/<student-slug>/`
when deployed). Pass that value as the root to `Navigo`:

```js
import Navigo from 'navigo'

const router = new Navigo(import.meta.env.BASE_URL)

router
  .on('/', () => {
    // Render home view
  })
  .on('/items/:id', ({ data }) => {
    // Render item detail view for data.id
  })
  .resolve()
```

## Instructor Commands

### 1. Issue or Rotate a Student's Deployment Token

Run `scripts/issue-student-token.sh` using the `artzt-cocc` AWS SSO profile. It creates an IAM user
(`cocc-student-<slug>`) whose permissions are strictly locked to
`s3://cocc-cis133js-projects-081028362911/<slug>/*`:

```bash
# Print credentials to terminal:
./infra/scripts/issue-student-token.sh phillips

# Or create/rotate keys and push them directly to the student's GitHub repo secrets via gh CLI:
./infra/scripts/issue-student-token.sh phillips --push-secrets --rotate
```

### 2. Update Infrastructure with CDK

```bash
cd infra
npm install
npm run diff
npm run deploy
```
