---
id: updating-your-bridgechain
title: Updating Your Bridgechain
---

Now that your genesis node is running, you may have made changes to some Core configuration files on your server. If so, it is advisable to push those changes to your GitHub repository before building your network. If you haven't made any changes, disregard this step.

## Notes

After updating, you should check whether your application still works as expected and no plugins are broken. Plugins will likely have to be updated to accommodate the latest Core changes. Consult the [releases](https://docs.ark.io/releases/) page for an overview of each breaking change on ARK Core.

## Executing Update Script

Deployer is equipped with a script to update your bridgechain to the latest Core release. The update script will perform the following operations:

* Stop all Core processes
* Update your bridgechain to the latest Core release
* Run post-update scripts
* Generate update script for relay nodes
* Compile Core
* Push the updated branch to your GitHub repository

To update your bridgechain, perform the following:

1. Change directories using:

```sh
cd ~/ark-deployer/
```

2. The script will perform the necessary changes to update your bridgechain. To start the update process, type:

```sh
bash bridgechain.sh update-core
```

3. Once the update has been completed, we then need to push it to your bridgechain's repository. When prompted, provide your GitHub username or email address and password. A new branch called `update/CORE_VERSION` will be created in your repository, where `CORE_VERSION` will be the version that your bridgechain was updated to.


>Your server's `plugins.js` configuration file will be updated. If you have modified it before, or registered custom plugins, you will have to add your changes again. You can find a backup of your previous `plugins.js` file in `~/.config/BRIDGECHAIN_NAME-core/NETWORK/`

4. At this point, you can [start the Core processes](deploy/running-and-managing-core-processes.md) again. Check the logs to ensure that bridgechain was updated successfully.

## Updating Peers

With your genesis node and bridgechain repository now up to date, it's time to update the peers in your network. For each peer server, perform the following:

1. Change directories to your bridgechain's directory:
```sh
cd ~/core-bridgechain/
```

2. Type:

```sh
bash <(curl -s https://raw.githubusercontent.com/GITHUB_USERNAME/REPOSITORY/update/CORE_VERSION/upgrade/CORE_VERSION/update.sh)
```

Replace the following and execute:

- `GITHUB_USERNAME` with your or your project's GitHub username
- `REPOSITORY` with your bridgechain's repository
- `CORE_VERSION` with the Core version that your bridgechain was updated to

Once it finishes updating your peer, start the Core processes and check the logs to ensure that it was updated successfully.

>The `plugins.js` configuration file is also updated on peer nodes. If you have modified it before, you will have to add your changes again.

## Recommendations

1. Test your bridgechain thoroughly. It is recommended to deploy the update to a devnet or testnet network before migrating it to your mainnet network.

2. Ensure that all custom plugins are updated and compatible with the Core version you're updating to.

3. The v1 API has been deprecated and removed from Core. Make sure that your applications are compatible with the v2 API.

4. Coordinate a plan of action with your bridgechain's delegates and peers. Making sure that most of the network updates in a timely matter is essential for a healthy network update.

<div class="alert alert-error"><b>Security Recommendation:</b> Ensure that your bridgechain is always up to date with the latest Core release. Releases include important security patches that are essential to keep your bridgechain secure!</div>
