Prerequisite: complete
[course setup instructions outlined in our class Git repo](https://github.com/artzte/cocc-js).

# Here's your Week 1 assignment.

1. Create a **week1** branch in your class repository
2. Create a **week1** project folder, by copying over the starter kit (use `scripts/mpf.sh`)
3. Change the text displayed on the web page from _Hello, Javascript!_ to something else that suits
   your fancy. Verify in your browser that your new text is showing up.
4. Run the test suite. I would expect it to fail, due to the change from step 3\. Fix the test to
   reflect the new code. Verify that the test passes with your changes.
5. Create a pull request against your main branch in your class repository, request me as a
   reviewer, and send me a link to the pull request via the text box below.

As with all of our weekly projects, I will award full credit if we are able to come to a consensus
that the project is complete. I will indicate that I am good with your work by approving your pull
request on Github. You need to either address the suggestions that I make by updating your code, or
you can reply to my comment and explain why a change is unnecessary.

# Here's a summary of all the things to complete your setup and first week submission.

## 1\. Github account and repository setup

1. Get yourself a free Github account, using your COCC email address. If you already have a Github
   account, add your COCC email address to your account.
2. Apply for [Github education](https://github.com/settings/education/benefits) using your COCC
   email address.
3. Go to the class code repository, <https://github.com/artzte/cocc-js>, and use the "Use this
   template" button to copy the project to your Github account. Be sure to include **your last name
   in the repository name**, and make the repository **private**.
4. In the new repository, got to the "Settings" tab, and then add me as a collaborator under the
   "Collaborators" link: **artzte** is my Github handle.

## 2\. Class project folder setup on your computer

1. Clone your new repository to your computer, somewhere where you keep your other source-code
   projects. e.g., `~/src/artzt-cocc-js`. The command would be something like:
   `git clone git@github.com:shermans-dad/artzt-cocc-js.git`
2. Open your new folder in Visual Studio Code. You might just be able to use this command from your
   terminal: `code .`
3. Open a terminal in Visual Studio Code.
4. Change directories into the **starter** folder and install package dependencies: `npm install`

## 3\. Try out the starter kit and verify that everything works.

All this from the **starter** folder:

1. Run the tests: `npm test`
2. Run the dev server and verify that you can open the url in your browser: `npm start`
3. Kill the dev server (`Ctrl+c`)

## 4\. Create the week1 assignment template and a new branch

From the root folder of the project:

1. Build a **week1** project folder using the script: `scripts/mpf.sh week1`
2. Create a **week1** branch: `git checkout -b week1` or use the desktop app to create a branch.
3. Add your newly copied files to a new commit: `git add week1`
4. Commit these files so you have a checkpoint: `git commit -m"week1 starter kit"`
5. Check the Git log to see your work: `git log`
6. Push your branch to a new remote repository: `git push --set-upstream origin week1`

## 5\. Make the requested changes for the assignment.

From the **week1** project folder:

1.  Start up the dev server: `npm start`
2.  Open your editor into the project folder: `code .`
3.  Find the `src/app.js` file and change the prompt from "Hello JavaScript!" to something else.
4.  Find the `test/starter-test.js` file and update the prompt it is looking for, so that the test
    is passing.
5.  Save everything, and confirm that your web preview in the browser is showing your updated text.
6.  Verify the tests by opening a second terminal window and running: `npm test`

## 6\. Commit and push your assignment changes, and create a pull request.

From the **week** project folder:

1.  Commit your changes to app.js and starter-test.js: `git commit -am"assignment tasks"`
2.  Push the new commit: `git push`
3.  Visit your repository on Github and open a pull request to merge your **week1** branch into the
    **main** branch. You can do this from the "Pull Requests" tab.
4.  Request me as a reviewer: **artzte**
5.  Copy the URL of the pull request and submit it below.

## 7\. Phew!

Week 1 involved a lot of setup work. But we're now on a good footing to start productively coding
JavaScript together, and to learn some standard developer workflows with Git and Github, to boot.
