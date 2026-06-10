# Getting started

Resources:

- [https://learn.microsoft.com/en-us/windows/wsl/](https://learn.microsoft.com/en-us/windows/wsl/)
- [https://docs.github.com/en/authentication/connecting-to-github-with-ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [https://github.com/nodenv/nodenv](https://github.com/nodenv/nodenv)

## WSL setup (from PowerShell)

    wsl --install

### Get into a Bash shell (from PowerShell)

    bash

### Handy Bash commands

#### Change to my home folder under WSL

    cd ~

#### Which folder am I in?

    pwd

#### Start Windows Explorer in the current WSL folder

    explorer.exe .

Otherwise it can be tricky to see where your home folder is!

#### Sending information to the Windows clipboard

    ls | clip.exe

## Universal setup from Bash shell

## Git install and setup

    sudo apt-get install git
    git --version
    git config --global user.name "Your Name"
    git config --global user.email "your@email"

## Configure your SSH key for Github

    cd ~
    mkdir .ssh
    ssh-keygen -t rsa -b 4096 -C "your@email"
    cat id_rsa.pub | clip.exe

Now you have your public key on your clipboard. Go to your Github account and add the key here: [https://github.com/settings/keys](https://github.com/settings/keys)

## Set up a source folder

    cd ~
    mkdir src
    cd src
    pwd

## Clone the course repository

    git clone git@github.com:artzte/cocc-js.git

## Install nodenv and Node

Just follow the directions on the [nodenv website](https://github.com/nodenv/nodenv). Install both [nodenv](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git) and [node-build plugin](https://github.com/nodenv/node-build#clone-as-nodenv-plugin-using-git).

Then, init your shell for Node:

   ~/.nodenv/bin/nodenv init

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

   cd ~/src/cocc-js/starter
   npm i
   npm run dev
