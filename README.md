# Getting started

First step: if you don't already have a GitHub account, create one for yourself, using your COCC
email.

## Resources:

- [Github educational benefits](https://github.com/settings/education/benefits) -- you will need to
  add your COCC email address to your account in order to take advantage of Github's generous
  educational package.
- <https://learn.microsoft.com/en-us/windows/wsl/> - Windows Subsystem for Linux
- <https://desktop.github.com/download/> - desktop Github app
- <https://code.visualstudio.com/> - Visual Studio Code
- <https://docs.github.com/en/authentication/connecting-to-github-with-ssh>
- <https://github.com/nodenv/nodenv>

## Windows users only: set up the Windows Subsystem for Linux (WSL)

From PowerShell:

```
wsl --install
```

### Open a Bash shell

From PowerShell:

```
bash
```

### Handy Bash commands

From Bash:

#### Change to my home folder under WSL

```
cd ~
```

#### Which folder am I in?

```
pwd
```

#### But, which Windows folder am I in?

```
wslpath -w "$PWD"
```

#### Start Windows Explorer in the current WSL folder

```
explorer.exe .
```

Otherwise it can be tricky to see where your home folder is!

#### Sending information to the Windows clipboard

Pipe it to `clip.exe`.

```
ls | clip.exe
```

#### IMPORTANT: If you are getting a permission error from the mpf.sh script

With Windows and the WSL, we are dealing with two file systems on one machine, that have different
ways of identifying which files can be run as a program. How you pull your repository down to your
machine will determine whether there is a followup step after cloning your repo.

If you use the Git command line to clone your personal copy of the class repository (see Step 5,
below) and you do that within your Bash shell, you are golden; the scripts/mpf.sh script will be
executable and you can eg:

```
scripts/mpf.sh week1
```

without seeing an error message.

If, however, you use the e.g. Github desktop app to clone your repository, when you run the script,
you will see an error message:

```
scripts/mpf.sh week1    # produces an error such as "scripts/mpf.sh: Permission denied"
```

To fix this, just run this command:

```
chmod u+x scripts/mpf.sh
```

Why is this the case? It's because the Github Desktop app runs under your Windows host environment,
while the script is being run within your Bash terminal session, which is under the Linux host
environment.

## Universal Setup (Windows/WSL, MacOS, Ubuntu, etc)

Here, you already have a Linux-compliant command-line environment. So you can proceed with the
universal course setup requirements.

## Step 1: Create a Github account if you don't already have one, and sign up for the educational tier benefits.

This might take a day or so for the educational application to be accepted, so be sure to do this
early in the week.

1. Sign up for your account here: [Github signup page](https://github.com/signup)
2. Make sure your COCC email address is registered on the account:
   [Github emails page"](https://github.com/settings/emails)
3. Sign up for the educational-tier benefits:
   [Github educational tier signup page](https://github.com/settings/education/benefits?locale=en-US)

## Step 2: Install Git, and connect the command-line environment with your Github account

Is Git already installed? If you're not sure:

```
git --version
```

> [!NOTE] I encourage you to install the Git CLI and learn its commands. Fluency in command-line Git
> is a must for any serious software developer. That said, you can also use a GUI client for Git,
> such as Github's own [Github Desktop](https://desktop.github.com/download/). Our 'Getting Started'
> video shows me using Github Desktop to complete the Week 1 assignment. The following instructions
> are about installing the Git CLI, if it is not already set up and configured for Github.

### 2a: Git CLI install and setup

```
sudo apt-get install git
git --version
```

### 2b: Git user configuration

```
git config --global user.name "Your Name"
git config --global user.email "your-cocc-email@cocc.edu"
```

### 2c: Configure your SSH key for Github

Note: When you run `ssh-keygen`, you will be asked for a passphrase. If your computer is
sufficiently secured with a login password, you don't necessarily need to use a passphrase, so you
can just hit Enter key when asked for one. Best security practice is to use a passkey, but that
requires a little bit of extra setup around the ssh-agent. That workflow is adequately documented on
this
[Github setup instructions page](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent),
so I won't cover it here.

This is the shortcut method with no passphrase; just hit Enter when prompted for a passphrase.

```
cd ~
mkdir .ssh
ssh-keygen -t rsa -b 4096 -C "your-cocc-email@cocc.edu"
cat id_rsa.pub  # copy the output from this command to your clipboard
```

Copy the public key output from the last line above to your clipboard. 
Go to your Github account and add the key here: <https://github.com/settings/keys>

## Step 3: Set up a source folder, and go there

Maybe you already have a folder for parking your code repositories! If so, just use it.

> [!NOTE] If you are on Windows, just make sure your `src` folder is accessible to Bash! You'll need
> to create it under your Bash home folder (eg, `~/src`)

```
cd ~
mkdir src
cd src
```

## Step 4: Create a course repository for your assignments. You will use this repo as a template.

1. While logged in to your student Github account, visit the
   [course repo](https://github.com/artzte/cocc-js).
2. Find the green "Use this template" button at the top.
3. Click "Create a new repository"
4. Name your repository to include your last name e.g `artzt-cocc-js`
5. Scroll down, and under Configuration, choose "Private" for visibility.
6. Click the green "Create repository" button and wait a minute for the files to copy over.
7. Add me as a collaborator (find this under the "Settings" tab, under "Collaborators and Teams" /
   "Manage access"). My github handle is `artzte`.

## Step 5: Clone your new repository

> [!NOTE] You can also do this using Git Desktop. See Week 1 Getting Started video.

```
git clone git@github.com:(my-gh-handle)/lastname-cocc-js.git
```

## Step 6: Install NodeENV and Node

Maybe Node is already installed on your computer:

```
node --version
```

If not, or if your version is out of date (as of this writing,
[LTS is 24.x](https://nodejs.org/en)), then follow the directions on the
[nodenv website](https://github.com/nodenv/nodenv). Install both
[nodenv](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git) and
[node-build plugin](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git).

Then, init your shell for Node:

```
~/.nodenv/bin/nodenv init
```

Close your terminal and open one again.

Now, install a Node version and make it your global:

```
# see the versions
nodenv install --list

# install one and make it global
nodenv install 24.16.0
nodenv global 24.16.0
```

## Jump into your course repository and crank up the starter kit!

```
cd ~/src/cocc-js/starter
npm install
npm start
```

To run tests (in a separate terminal tab):

```
npm test
```

## Setting up to receive course updates

I will periodically update this repo during the term. You can retrieve these updates to your own
repository by setting up a Git remote to your local repo (do this once):

```
git remote add template git@github.com:artzte/cocc-js.git
```

Then, to retrieve the updates (do this every time you want to fetch updates):

```
# make sure you have a clean repo - no changes to commit
git fetch template
git merge template/main --allow-unrelated-histories -X theirs -m"course update"
```

# Visual Studio notes

## If you are on Windows, set WSL as your default terminal profile.

So that, when you open a new terminal window, you will have a bash session.

1. Ctrl+Shift+P (to open the command palette)
2. Type "Terminal: Select default profile"
3. Pick "Ubuntu (WSL)"

## Set autosave

So that, when you leave your active tab, the editor will automatically save your work

1. Ctrl+Shift+P (to open the command palette)
2. Type "Toggle autosave"

# Pulling in cocc-js template updates

```
# Add a remote reference to my repo
git remote add template git@github.com:artzte/cocc-js.git

# Check out the main branch
git checkout main

# Confirm no changes locally
git status

# Merge template updates
git merge template/main --allow-unrelated-histories -X theirs
```
