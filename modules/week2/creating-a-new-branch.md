# Creating a new branch for a new project

This video shows how to switch to your main branch and pull your merged project into your main
branch; and then, create a new branch for your current week project.

Here's a transcript of the (relevant) commands I ran during the demo, with notes:

```
# what are the commits in this branch?
git log

# what changes are in the topmost (HEAD) commit?
git show HEAD

# what branch am I in right now?
git branch

# switch to the main branch
git checkout main

# fetch updates from the origin on github
git fetch

# update the main (current) branch with the upstream updates
git pull

# create a new branch based on the updated main branch
git checkout -b html-forms-demo

# confirm that there are no changes
git status

# add some changes after copying the starter kit
git add .

# create the commit
git commit -m"starting commit for forms demo project"

# push our new branch to github so we can create a pull request
git push --set-upstream origin html-forms-demo
```
