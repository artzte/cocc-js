## Setting up for the course

This video covers the Week 1 setup requirements for the course. There's one assignment this week,
but a bit of prep to get there. Hopefully this video covers the essentials. It includes the steps to
submit the first assignment.

[!kaltura](https://cocc.instructure.com/accounts/1/external_tools/18893?launch_type=global_navigation&toolId=kaltura-my-media-18893)

## All the things...

These instructions use the git command line. If you'd rather use the Github Desktop app instead,
that's great! That's what I did in the video.

### 1\. Github account and repository setup

1. Get yourself a free Github account, using your COCC email address. If you already have a Github
   account, add your COCC email address to your account.
2. Apply for [Github education](https://github.com/settings/education/benefits) using your COCC
   email address.
3. Go to the [class code repository](https://github.com/artzte/cocc-js), and use the "Use this
   template" button to copy the project to your Github account. Be sure to include **your last name
   in the repository name**, and make the repository **private**.
4. In the new repository, got to the "Settings" tab, and then add me as a collaborator under the
   "Collaborators" link: **artzte** is my Github handle.

### 2\. Class project folder setup on your computer

1. Clone your new repository to your computer, somewhere where you keep your other source-code
   projects. e.g., `~/src/artzt-cocc-js`. The command would be something like:
   `git clone git@github.com:shermans-dad/artzt-cocc-js.git`
2. Open your new folder in Visual Studio Code. You might just be able to use this command from your
   terminal: `code .`
3. Open a terminal in Visual Studio Code.
4. Change directories into the **starter** folder and install package dependencies: `npm install`

### 3\. Try out the starter kit and verify that everything works.

All this from the **starter** folder:

1. Run the tests: `npm test`
2. Run the dev server and verify that you can open the url in your browser: `npm start`
3. Kill the dev server (`Ctrl+c`)

### 4\. Create the week1 assignment template and a new branch

From the root folder of the project:

1. Build a **week1** project folder using the script: `scripts/mpf.sh week1`
2. Create a **week1** branch: `git checkout -b week1` or use the desktop app to create a branch.
3. Add your newly copied files to a new commit: `git add week1`
4. Commit these files so you have a checkpoint: `git commit -m"week1 starter kit"`
5. Check the Git log to see your work: `git log`
6. Push your branch to a new remote repository: `git push --set-upstream origin week1`

### 5\. Make the requested changes for the assignment.

From the **week1** project folder:

1.  Start up the dev server: `npm start`
2.  Open your editor into the project folder: `code .`
3.  Find the `src/app.js` file and change the prompt from "Hello JavaScript!" to something else.
4.  Find the `test/starter-test.js` file and update the prompt it is looking for, so that the test
    is passing.
5.  Save everything, and confirm that your web preview in the browser is showing your updated text.
6.  Verify the tests by opening a second terminal window and running: `npm test`

### 6\. Commit and push your assignment changes, and create a pull request.

From the **week** project folder:

1.  Commit your changes to app.js and starter-test.js: `git commit -am"assignment tasks"`
2.  Push the new commit: `git push`
3.  Visit your repository on Github and open a pull request to merge your **week1** branch into the
    **main** branch. You can do this from the "Pull Requests" tab.
4.  Request me as a reviewer: **artzte**
5.  Copy the URL of the pull request and submit it below.

### 7\. Phew!

Week 1 involved a lot of setup work. But we're now on a good footing to start productively coding
JavaScript together, and to learn some standard developer workflows with Git and Github, to boot.
