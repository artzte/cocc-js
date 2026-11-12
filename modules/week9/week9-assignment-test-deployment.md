## Final Project: Test Deployment

This week you will set up the `projects/final` scaffold in your repository, pull in the automated
GitHub Actions deployment workflow, customize the page title and initial rendering so it is visually
distinct from the starter template, and verify that your live preview deploys to the course hosting
environment:

```text
https://d2zap10oyizxcd.cloudfront.net/<your-last-name>
```

For example, if your repository is `jdoe-cocc-js`, your deployed app will be live at
`https://d2zap10oyizxcd.cloudfront.net/jdoe`.

Read the full hosting and deployment guide in [`infra/README.md`](../../infra/README.md) before
starting.

Submit your **live CloudFront URL** on Canvas once your deployment succeeds.

---

### Requirements

1. **Pull the Deployment Workflow from the Course Template**:
   - Follow the instructions in [`infra/README.md`](../../infra/README.md) to fetch `template/main`
     and update your `main` branch so your repository includes `.github/workflows/deploy-final.yml`
     and the updated `starter/` configuration.
2. **Scaffold or Update `projects/final`**:
   - If you haven't created `projects/final` yet, generate it with `npm run weekly:create final`
     (make sure you keep your existing `projects/final/README.md` and any wireframe images from
     Milestones 1 and 2).
   - If you already created `projects/final` earlier in the term, copy the updated
     `starter/package.json` and `starter/eslint.config.js` into `projects/final/` and run
     `npm install`:
     ```bash
     cp starter/package.json starter/eslint.config.js projects/final/
     cd projects/final
     npm install
     ```
3. **Customize the Site Title and Initial Rendering**:
   - In `projects/final/index.html`, change the `<title>` element from `CIS 133JS` to the name of
     your final project application.
   - In `projects/final/src/app.js` (and/or your CSS), make a visual change to what `renderApp()`
     renders into `#app` so the page is clearly different from the default `Hello, JavaScript!`
     starter message (for example, rendering your app's header, description, layout shell, or color
     palette).
   - Update `projects/final/test/starter.test.js` so the starter test checks for your updated
     rendering instead of expecting `'Hello, JavaScript!'`.
4. **Pass All Required Build Checks (Including the New Linting Requirement)**:
   - Your code must now pass automated linting and formatting checks in addition to unit tests and
     the Vite build. **All four build checks must pass in order for the GitHub Action to deploy your
     app**:
     1. **`npm run lint`** (`eslint .`): Checks your JavaScript files with ESLint for syntax,
        undeclared/unused variables, and scope issues. (You can auto-fix safe issues with
        `npm run lint:fix`.)
     2. **`npm run format:check`** (`prettier --check .`): Verifies that all files match the
        project's Prettier formatting rules. (If this fails, run `npm run format` to format your
        files.)
     3. **`npm test`** (`vitest run`): Runs your Vitest test suite once and requires every test to
        pass.
     4. **`npm run build`** (`vite build`): Compiles the production bundle into `dist/` to verify
        that all imports and assets resolve cleanly.
   - You can run all four checks locally in one command from inside `projects/final`:
     ```bash
     npm run check
     ```
5. **Verify Your Live CloudFront Deployment**:
   - Push your changes to GitHub (any push touching `projects/final/**` triggers the **Deploy Final
     Project** workflow automatically, or you can trigger it manually under **Actions** → **Deploy
     Final Project** → **Run workflow**).
   - Confirm that the workflow finishes with a green check mark under your repository's **Actions**
     tab.
   - Open `https://d2zap10oyizxcd.cloudfront.net/<your-last-name>` in your browser and confirm that
     your updated `<title>` and visual changes appear.

---

### Steps to Complete & Submit

1. **Pull the latest course template updates onto `main`**:
   ```bash
   git checkout main
   git status
   git fetch template
   git checkout template/main -- :/
   git commit -m "updates from course template"
   git push origin main
   ```
2. **Create or update `projects/final`** (on `main` or your final project branch):
   ```bash
   npm run weekly:create final
   cd projects/final
   npm install
   ```
   _(If `projects/final` already existed, copy `starter/package.json` and `starter/eslint.config.js`
   into `projects/final/` and run `npm install`.)_
3. **Update the site title, visual rendering, and starter test**:
   - Change `<title>` in `projects/final/index.html` to your app's name.
   - Update `projects/final/src/app.js` (and optionally styles) so the rendered page looks different
     from the `Hello, JavaScript!` default.
   - Update `projects/final/test/starter.test.js` to match your new rendered output.
4. **Run all build checks locally**:
   ```bash
   cd projects/final
   npm run check
   ```
   If formatting fails, run `npm run format`. If linting fails, fix the reported ESLint errors (or
   run `npm run lint:fix`) and run `npm run check` again until all four steps pass.
5. **Commit and push to trigger deployment**:
   ```bash
   git add projects/final
   git commit -m "feat(final): customize title and initial view for test deployment"
   git push
   ```
6. **Verify the deployment and submit on Canvas**:
   - Check the **Actions** tab on GitHub to make sure **Deploy Final Project** succeeded.
   - Visit `https://d2zap10oyizxcd.cloudfront.net/<your-last-name>` and verify your custom title and
     visual change are live.
   - Copy your live CloudFront URL (`https://d2zap10oyizxcd.cloudfront.net/<your-last-name>`), paste
     it into the Canvas assignment submission box, and submit it.
7. **Deadline**: Due by **Monday, November 23, 2026 at 11:59 PM** (the Monday following Week 9).
