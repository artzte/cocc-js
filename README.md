# Getting started

First step: if you don't already have a GitHub account, create one for yourself,
using your COCC email.

During Week1, you'll send me your Github handle so that I can grant you access
to our course repository.

## Resources:

- [Github educational benefits](https://github.com/settings/education/benefits) -- you will need to add your COCC email address to your account in order to take advantage of Github's generous educational package.
- [https://learn.microsoft.com/en-us/windows/wsl/](https://learn.microsoft.com/en-us/windows/wsl/)
- [https://docs.github.com/en/authentication/connecting-to-github-with-ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [https://github.com/nodenv/nodenv](https://github.com/nodenv/nodenv)

## Windows only: Windows Subsystem for Linux (WSL) setup

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

```
ls | clip.exe
```

## Universal Setup (Windows/WSL, MacOS, Ubuntu, etc)

Here, you already have a Linux-compliant command-line environment.
So you can proceed with the universal course setup requirements.

## Git?

Is Git already installed? If you're not sure:

```
git --version
```

Make sure you have set up your configs (the two commands at the end of the next section).

## Git install and setup

```
sudo apt-get install git
git --version
git config --global user.name "Your Name"
git config --global user.email "your-cocc-email@cocc.edu"
```

## Configure your SSH key for Github

```
cd ~
mkdir .ssh
ssh-keygen -t rsa -b 4096 -C "your-cocc-email@cocc.edu"
cat id_rsa.pub
```

Copy the public key output to your clipboard. Go to your Github account and add the key here: [https://github.com/settings/keys](https://github.com/settings/keys)

## Set up a source folder, and go there

```
cd ~
mkdir src
cd src
```

## Create a course repository for your assignments. You will use this repo as a template.

1. While logged in to your student Github account, visit the [course repo](https://github.com/artzte/cocc-js).
2. Find the green "Use this template" button at the top.
3. Leave all the default information; I suggest you name your repository e.g `(my-gh-handle)-cocc-js`
4. Go to the Settings area of your forked repository, and scroll down to the Danger Zone area. Change the visibility of your repo to private.
5. Add me as a collaborator (find this under Collaborators and Teams / Manage access). My github handle is `artzte`.


## Clone your newly copied repository

```
git clone git@github.com:(my-gh-handle)/cocc-js.git
```

## Install NodeENV and Node

Just follow the directions on the [nodenv website](https://github.com/nodenv/nodenv). Install both [nodenv](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git) and [node-build plugin](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git).

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

