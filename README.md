# Getting started

First step: if you don't already have a GitHub account, create one for yourself, using your COCC email.

During Week1, you'll send me your Github handle so that I can grant you access to our course repository.

## Resources:

- [Github educational benefits](https://github.com/settings/education/benefits) -- you will need to add your COCC email address to your account in order to take advantage of Github's generous educational package.
- <https://learn.microsoft.com/en-us/windows/wsl/>
- <https://docs.github.com/en/authentication/connecting-to-github-with-ssh>
- <https://github.com/nodenv/nodenv>

## Step 0 (Windows users only): set up the Windows Subsystem for Linux (WSL)

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

## Universal Setup (Windows/WSL, MacOS, Ubuntu, etc)

Here, you already have a Linux-compliant command-line environment. So you can proceed with the universal course setup requirements.

## Step 1: Create a Github account if you don't already have one, and sign up for the educational tier benefits.

This might take a day or so for the educational application to be accepted, so be sure to do this early in the week.

1. Sign up for your account here: [Github signup page](https://github.com/signup)
2. Make sure your COCC email address is registered on the account: [Github emails page"](https://github.com/settings/emails)
3. Sign up for the educational-tier benefits: [Github educational tier signup page](https://github.com/settings/education/benefits?locale=en-US)

## Step 2: Install Git, and connect the command-line environment with your Github account

Is Git already installed? If you're not sure:

```
git --version
```

> [!NOTE] I encourage you to install the Git CLI and learn its commands. Fluency in command-line Git is a must for any serious software developer. That said, you can also use a GUI client for Git, such as Github's own [Github Desktop](https://desktop.github.com/download/). Our 'Getting Started' video shows me using Github Desktop to complete the Week 1 assignment. The following instructions are about installing the Git CLI, if it is not already set up and configured for Github.

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

Note: When you run `ssh-keygen`, you will be asked for a passphrase. If your computer is sufficiently secured with a login password, you don't necessarily need to use a passphrase, so you can just hit Enter key when asked for one. Best security practice is to use a passkey, but that requires a little bit of extra setup around the ssh-agent. That workflow is adequately documented on this [Github setup instructions page](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), so I won't cover it here.

This is the shortcut method with no passphrase; just hit Enter when prompted for a passphrase.

```
cd ~
mkdir .ssh
ssh-keygen -t rsa -b 4096 -C "your-cocc-email@cocc.edu"
cat id_rsa.pub
```

Copy the public key output to your clipboard. Go to your Github account and add the key here: <https://github.com/settings/keys>

## Step 3: Set up a source folder, and go there

Maybe you already have a folder for parking your code repositories! If so, just use it.

> [!NOTE] If you are on Windows, just make sure your `src` folder is accessible to Bash! You'll need to create it under your Bash home folder (eg, `~/src`)

```
cd ~
mkdir src
cd src
```

## Step 4: Create a course repository for your assignments. You will use this repo as a template.

1. While logged in to your student Github account, visit the [course repo](https://github.com/artzte/cocc-js).
2. Find the green "Use this template" button at the top.
3. Except for the repo name, leave all the default information; I suggest you name your repository e.g `(my-gh-handle)-cocc-js`
4. Go to the Settings area of your forked repository, and scroll down to the Danger Zone area. Change the visibility of your repo to private.
5. Add me as a collaborator (find this under Collaborators and Teams / Manage access). My github handle is `artzte`.

## Step 5: Clone your new repository

> [!NOTE] You can also do this using Git Desktop. See Week 1 Getting Started video.

```
git clone git@github.com:(my-gh-handle)/cocc-js.git
```

## Step 6: Install NodeENV and Node

Maybe Node is already installed on your computer:

```
node --version
```

If not, or if your version is out of date (as of this writing, [LTS is 24.x](https://nodejs.org/en)), then follow the directions on the [nodenv website](https://github.com/nodenv/nodenv). Install both [nodenv](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git) and [node-build plugin](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git).

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
npm i
npm run dev
```

To run tests:

```
npm test
```
