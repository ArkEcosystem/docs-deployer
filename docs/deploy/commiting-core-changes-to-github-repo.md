---
id: commiting-core-changes-to-github-repo
title: Committing Core Changes to GitHub Repo
---

Now that your genesis node is running, you may have made changes to some Core configuration files on your server. If so, it is advisable to push those changes to your GitHub repository before building your network. If you haven't made any changes, disregard this step. 

1. Change directories using:

```sh
cd ~/core-bridgechain/
```

2. To view which files have been changed and need to be updated on Github type:

```sh
git status
```

3. Before we continue, let’s make sure there were no new changes made between us installing and us forking the core repository. To do this, execute:

```sh
git pull
```
4. Add files to the staging area by executing:

```sh
git add
```
5. Commit the changes with the command:

```sh
git commit -m "chore: new network config"
```

You can rename `new network config` to some other specific task label. This is just a reference for other GitHub contributors.
6. Once the changes have been committed, we then need to push them to our repository. Do this by executing:

```sh
git push
```

7. Enter your GitHub username and password credentials.

Your changes have now been successfully pushed to your GitHub repository.
