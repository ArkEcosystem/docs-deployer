---
title: ARK Deployer v2  - Setup Guide
---

![](https://cdn-images-1.medium.com/max/2400/1*QqkyhgSoY4ygLNs0RqZ0TA.png)

**_With the much-anticipated Deployer v2 arrival, we made sure to accompany the release with a full guide. This guide outlines the setup of a new Bridgechain, setting up a multi-node network, and also adding a new Bridgechain to the ARK Desktop Wallet._**

#### Prerequisites

*   A fresh Ubuntu 18 machine (or VirtualBox with Vagrant).
*   Basic knowledge of system administration, command-line, and bash.

> This guide is written based on a specific set of configurations that we have used. Yours will differ, more-so in terms of settings for your Bridgechain and IP addresses for your nodes.

### Setting up a new Bridgechain

You have 2 options to set up your own Bridgechain:

*   **Install your new Bridgechain (with Vagrant)** — follow this very small section for setting it up with Vagrant then skip to section: **_Adding the Bridgechain to your Desktop Wallet_**.
*   **Install your new Bridgechain (without Vagrant)** — follow from this section onwards if you want to set up core manually and have a better understanding of the installation steps.

#### Install your new Bridgechain (with Vagrant)

We have provided a Vagrant file which allows you to deploy your own Bridgechain and Explorer together with no configuration necessary. All IPs when referencing Core and Explorer from the Vagrant machine will use **192.168.33.10**.

> **_Note: This requires Vagrant version 2+ to be installed from_** [**_here_**](https://www.vagrantup.com/downloads.html)**_, and also VirtualBox from_** [**_here_**](https://www.virtualbox.org/wiki/Downloads)**_._**

**Download ARK Deployer**

```sh
$ git clone [https://github.com/ArkEcosystem/deployer.git](https://github.com/ArkEcosystem/deployer.git) ~/ark-deployer && cd ~/ark-deployer
```

**Initiating a Vagrant Machine
**Used to start a Vagrant machine. If the Vagrant machine already exists, it will resume as normal. If the Vagrant machine does not exist already, it will start it up and proceed to install Deployer, Core and Explorer.

```sh
$ vagrant up
```

As soon as the Vagrant process has finished installing, the machine will reboot. Once rebooted, Core and Explorer will start automatically and will be accessible at the following URLs:

*   **_Core Public API:_** [http://192.168.33.10:4103/api/v2/blocks](http://192.168.33.10:4103/api/v2/blocks)
*   **_Explorer:_** [http://192.168.33.10:4200/](http://192.168.33.10:4200/)

**Destroying a Vagrant Machine
**NOTE: This option is only necessary if you want to completely remove the Vagrant machine. Only run this if you plan on creating a new Vagrant Bridgechain later on since **ALL Data will be lost**.

```sh
$ vagrant destroy
```

**Tweaking Bridgechain Options (Advanced)**

Open up `~/ark-deployer/vagrant/config.json` and you will see all the possible options that you can change. These are all used when deploying the Bridgechain with Vagrant and can be customized. Refer to the [**node options**](https://github.com/ArkEcosystem/deployer#core-installation)  and [**Explorer options**](https://github.com/ArkEcosystem/deployer#explorer-installation) before continuing to get an idea of the purpose of each option. Once you are happy with your config, go ahead and start the Vagrant environment as above. After a short while, your new chain will be set up and your Testnet will be automatically started.

> **Note**: If you change config.json, you will need to destroy and re-initiate your vagrant set up.

#### Install your new Bridgechain (without Vagrant)

In order to create a new Bridgechain without Vagrant, we need to start with a new Core node. This will initially be our auto-forging node, with which we can slowly add additional nodes in the future to begin growing the network. We will be running the Testnet for now, but production networks would run the Mainnet configuration.

> Note: Snippets starting with a **$** imply a command that needs to be run on your server. You do not copy the **$** itself.

#### Remote into your new server with SSH

Make sure to remote in as a normal user with sudo access, not as root. You won’t be able to install the Bridgechain as a super-user.

![](https://cdn-images-1.medium.com/max/1600/1*IPkj8M23PnBu4VsP9wcWpw.png)

#### Download and prepare ARK Deployer

```sh
$ sudo apt-get update && sudo apt-get install -y git curl
$ git clone [https://github.com/ArkEcosystem/deployer.git](https://github.com/ArkEcosystem/deployer.git) ~/ark-deployer && cd ~/ark-deployer
$ source setup.sh
```

Now that our machine is set up for our bridgechain, we can go ahead and get it installed. Run the below command to install a simple, modified, core instance:

```sh
$ ./bridgechain.sh install-core --name MyBridgechain --database-name core\_mybridgechain --token MYBRIDGECHAIN --symbol MB --explorer-ip 95.216.157.210 --autoinstall-deps
```

> **Note:** Insert your server or local IP here instead of 95.216.157.210.

> **Note 2:** There are many more options available when setting up your Bridgechain which can be found [**here**](https://github.com/ArkEcosystem/deployer#core-installation). You can also use a  [**JSON config file**](https://github.com/ArkEcosystem/deployer#json-config) to specify your parameters.

After about 10 minutes (can vary depending on the specification of the machine), the Deployer will finish installing Core.

![](https://cdn-images-1.medium.com/max/2400/1*riMSg3PKNWvKSo5tvXg5EQ.png)

Bridgechain successfully installed — you can see the Genesis Wallet details above.

When the install completes, you will see the above output. This is basically informing you of the information you will need in order to interact with your new networks.

#### Start your new Bridgechain Testnet

```sh
$ ./bridgechain.sh start-core --network testnet
```

![](https://cdn-images-1.medium.com/max/1600/1*_2Xr9YtTa2DarE5UKMWAQg.png)

Your Bridgechain Testnet has now been started.

#### Checking Core is running

Now that our new Testnet is running, we need to make sure it’s working correctly. Firstly, we can make sure there are no errors showing up in the logs. To do this, use the following command:

```sh
$ ./bridgechain.sh logs-core
```

![](https://cdn-images-1.medium.com/max/1600/1*ImVblWIkYdUc7mnxOU6e3Q.png)

We can see here from both the forger log and the relay log, that blocks are being forged and processed on the local network.

Next, we can check to make sure the core processes are running using PM2. enter the below and it will list the currently running processes:

```sh
$ pm2 list
```

![](https://cdn-images-1.medium.com/max/2400/1*Kl28EdY9HffW3ImECDTMWA.png)

Finally, we can test the API, which should also give us confirmation that blocks are being forged. Head over to [http://95.216.157.210:4103/api/v2/blocks](http://95.216.157.210:4103/api/v2/blocks).

> **Note:** Use your server or local IP here.

![](https://cdn-images-1.medium.com/max/2400/1*p8vRipTRgvXktld6obcPkA.png)

You will see that the block height is going up as expected, with the example above showing us we’re currently at height 44.

This is great confirmation that our testnet is working! However, it’s a bit of an eye-sore, so we should head to the next step.

### Setting up your Bridgechain Explorer

The Explorer is a critical tool when viewing, managing or interacting with any Blockchain. In the case of ARK and ARK Bridgechains, it allows for checking up on the currently active delegates (as well as inactive), we can take a look at transactions being processed, and finally, we can see all the blocks which are being forged.

#### Install Explorer

Installation of the Explorer is just as simple as installing Core. Run the command below to get the process started:

```sh
$ ./bridgechain.sh install-explorer --name MyBridgechain --token MYBRIDGECHAIN --core-ip 95.216.157.210 --explorer-ip 95.216.157.210 --skip-deps
```

> **Note**: Use your server or local IP here.

> **Note 2:** As with Core, there are many more options available when setting up your Explorer which can be found [**here**](https://github.com/ArkEcosystem/deployer#explorer-installation). You can also use a [**JSON config file**](https://github.com/ArkEcosystem/deployer#json-config) here too in order to specify your parameters.

#### Start Explorer

Now that we’ve set up our Explorer, we can start it. The start process can take a little time because it has to build based on the network option that is provided.

```sh
$ ./bridgechain.sh start-explorer --network testnet
```

![](https://cdn-images-1.medium.com/max/1600/1*hBqKjs-jflqun_7raA4LXg.png)

Automatically shows a list of running processes once started.

Now that we know the Explorer is running, we can access it from our browser. Head over to [http://<your-ip-address>:4200/](http://95.216.157.210:4200/) and take a look.

> **Note:** Use your server or local IP here.

![](https://cdn-images-1.medium.com/max/1600/1*g8tlX23ATH8zaPQ9hKI6KQ.png)

Explorer home, showing initial transactions from the Genesis Block.

![](https://cdn-images-1.medium.com/max/1600/1*oPC6QYX0C8pzN8X9-8tMUQ.png)

Explorer Delegate Monitor, showing the forging status of each genesis delegate.

### Adding the Bridgechain to your Desktop Wallet

Now that we have our Bridgechain Testnet setup and running with an Explorer, we want to get to know it a bit better. What better way to do that than with our beautiful [**Desktop Wallet**](https://github.com/ArkEcosystem/desktop-wallet/releases).

#### Adding the Network

To begin, open up the Desktop Wallet, click on “_Settings_” (the gear icon) in the sidebar, and then click on “_Manage networks_”.

![](https://cdn-images-1.medium.com/max/1600/1*MxGIviZgfWogv8jfjiJUjg.png)

From the Manage Networks page, click the “_Add a new network_” option at the top-right.

![](https://cdn-images-1.medium.com/max/1600/1*scJYHQKH_rYUXmdZoq3YGw.png)

In the “_New Network_” popup, fill in the details for your newly created Bridgechain. Make sure to use the Public API port, not the P2P port for the Seed Server.

![](https://cdn-images-1.medium.com/max/1600/1*81ZgUJQhrAPfeiyzSqG3QA.png)

Clicking on “_Fetch_” will proceed to a new form and populate all the data needed in order to access the new Bridgechain.

![](https://cdn-images-1.medium.com/max/1600/1*M9DyaNTX06ouvoyc9y-nGw.png)

Make any changes you may need (for beginners, leave it as is). Once you are happy, press the “_Save_” button.

![](https://cdn-images-1.medium.com/max/1600/1*1xacMStDr-lSV4PhrgDJNQ.png)

Your new Bridgechain is now available in the list of networks.

#### Creating a Profile

Now as I’m sure the majority of the readers here are avid users of our Desktop Wallet, you no doubt know how to create a new profile already. However, in case you are in that small minority, we will go through the steps just to be sure.

Our first step is to click on the avatar icon at the bottom of the sidebar (_it could also be a circle with a letter in the middle depending on what you have_).

![](https://cdn-images-1.medium.com/max/1600/1*ru0N1-xbz_rsJGUhrVrKsQ.png)

The avatar icon in the sidebar.

From here we need to go ahead and go to the profile creation page. Click on the “_Add profile_” button at the top-left of the page.

![](https://cdn-images-1.medium.com/max/1600/1*ZIXZ-jPf-oRUTaTnp7BflA.png)

Now that we have arrived at our destination, we need to fill out or information. Go ahead and fill out step 1. When you’re happy, click “_Next_”.

![](https://cdn-images-1.medium.com/max/1600/1*qf9FblOHKRULEw4g_IQ1OQ.png)

Step 2, choosing a network. This is the important part. Make sure you select the network we just created, otherwise we will be interacting on the wrong network. Once you’ve chosen, proceed to the next step.

![](https://cdn-images-1.medium.com/max/1600/1*8WHFcJJubhn9r0LAPJiSPQ.png)

Finally, step 3, your profile’s appearance settings. Go ahead and configure your options, and press “**Done**” when you’re happy.

![](https://cdn-images-1.medium.com/max/1600/1*hTIaXBpt_NDVC4o5GFZ-VA.png)

We will now instantly switch to our new profile and be taken to the Dashboard page.

#### Importing Genesis Wallet

Now that we have a profile to interact with our network, we need a wallet to test with. For simplicity, we will use our Genesis Wallet.

From the Dashboard page, click on the “_Import Wallet_” button at the top-right. You will notice a similar page to the “_New Profile_” page. Choose to import by passphrase only, and enter the passphrase that was given to you once the Bridgechain finished installing (make sure to use the testnet passphrase).

![](https://cdn-images-1.medium.com/max/1600/1*Hz9rr_6ei-XwKrwnhUsoWg.png)

Proceed through to Step 3 (you can choose to encrypt your wallet if you wish).

![](https://cdn-images-1.medium.com/max/1600/1*Id_v8naIq_d5d8P7ywYL_A.png)

Name your wallet (E.g. Genesis Wallet) and click “_Done_”. If you chose to encrypt your wallet, you will receive a popup telling you it is being encrypted.

![](https://cdn-images-1.medium.com/max/2400/1*IfJW80f29_YpOPVmsbMDHA.png)

As soon as we finish importing our wallet, we’ll be taken straight to the wallet page. You will notice straight away that we have the correct details because it’s showing both the balance and the pre-mine transaction in the transaction list.

Let’s give it a test. Hitting the “_Send_” button at the top-right, we’ll be presented with a new popup form. For now, we will just send a transaction to ourselves. Start typing “_Genesis_” into the recipient field and choose our wallet from the drop-down list. Enter an amount, and fill in the Smartbridge field (if you wish). Unless you chose to enable dynamic fees, we will stick with the default static fee here (may also differ if you changed your static fees).

Finally, fill in your passphrase (or encrypted password) and press “_Next_”.

![](https://cdn-images-1.medium.com/max/1600/1*DmH-GLJGNBKOiaOVcEVXng.png)

On the next screen, we will see confirmation of all our details. Assuming you are happy, press “_Send_”.

![](https://cdn-images-1.medium.com/max/1600/1*_8t40WWaJ3ueztmpP5g3vQ.png)

Now, if we check the logs of our Testnet server we will see our transaction get picked up and forged!

```sh
$ ./bridgechain.sh logs-core
```

![](https://cdn-images-1.medium.com/max/1600/1*GVPbo1WpYZ0SaPB9bus4Pw.png)

We can also take a look on Explorer and see our transaction successfully get processed.

![](https://cdn-images-1.medium.com/max/1600/1*I-1id7YrIDDU03WsB8dclg.png)

So this is good news! We have confirmed that not only have we successfully launched a Testnet and Explorer. We’ve also been able to add the new network to our desktop wallet and send a transaction to the network.

### Adding a Forging Delegate to the Network

Now, it’s all great with getting this far. But we’re only using a single server to manage all of the delegates. We need to make sure we can add additional delegates to the network, outside of the genesis delegates. The best way to do this is to add a new server into the mix, which will be used for forging a completely separate delegate.

#### Storing core on Git

The easiest way to do this is to store the core changes in a Git repository. On your existing server, head to the root folder of your new Core installation and check Git’s current status for that folder:

```sh
$ cd ~/core-bridgechain/
$ git status
```

![](https://cdn-images-1.medium.com/max/1600/1*GUFJuhKnBoVnGweE9Tap7Q.png)

Assuming you didn’t use the `--git-commit` parameter, you will get output similar to the above. This is basically showing that we have made some changes to files that need to be updated. We need to do the following steps:

**Fork our ARK Core v2 on GitHub**

Go to [**_https://github.com/ArkEcosystem/core_**](https://github.com/ArkEcosystem/core)  and click on the “_Fork_” button at the top-right of the page (don’t forget to star it as well 😊).

![](https://cdn-images-1.medium.com/max/1600/1*Ot1XvQpx2UeZt3kmLdFmOw.png)

“Fork” button in the top-right.

Then choose the repository/user where you want to create the fork.

![](https://cdn-images-1.medium.com/max/1600/1*lBipSCLW1-3fbtmEZ6NzyQ.png)

This will begin creating the forked repository and will automatically refresh when finished.

![](https://cdn-images-1.medium.com/max/1600/1*XujOXaPE7o2tgjJrDIkF9A.png)

**Change the Git Remote URL**

If you’ve not run Git on the server before, you will need to set up the commit user’s name and email address (ignore this if you already have these details):

```sh
$ git config --global user.name "ARK Deployer"
$ git config --global user.email "support@ark.io"
```

Now, with our newly created fork, we can update the “origin” of our codebase on the server.

On the home screen of the forked repository, on GitHub, there is a “Clone or download” button on the right, just above the list of files. Depending on whether you’re using SSH keys from your machine or not, you can opt to copy the SSH URL or the HTTPS URL (click the text “Use HTTPS” to switch).

![](https://cdn-images-1.medium.com/max/1600/1*Y-u0GbL8f-Fsu0UnMBVQaA.png)

Now that you have the URL for the origin, run the below command on your server (replacing the URL with your own):

```sh
$ git remote set-url origin [git@github.com](mailto:git@github.com):alexbarnsley/core.git
$ git remote -v
```

The second command will output the new origin URLs, just as a confirmation.

![](https://cdn-images-1.medium.com/max/1600/1*BVB7VSPISgbcl2rd3Gzb1w.png)

Before we continue, let’s make sure there were no new changes made between us installing and us forking the core repository. You can do this simply by pulling any changes down:

```sh
$ git pull
```

![](https://cdn-images-1.medium.com/max/1600/1*wBHrk0EGBkrK065WeIO7QQ.png)

Pull changes from our forked repo.

**Commit & push the changes**

Now, all we need to do is add all the files to the staging area, and commit them. To do this, we run:

```sh
$ cd ~/core-bridgechain
$ git add .
$ git commit -m "chore: new network config"
```

![](https://cdn-images-1.medium.com/max/1600/1*4SOIKopZuWHk_z7IqT9UYw.png)

The output from our commit command.

Finally, push your changes to your new repository:

```sh
$ git push
```

![](https://cdn-images-1.medium.com/max/1600/1*kdaGVahyXtedL_nfQ-lnqQ.png)

Output confirming that our changes have been pushed to our forked repository.

#### Set up new nodes to run your delegate

In order to have a functioning network with multiple nodes, we must have more than 2 nodes on the Testnet network. This value is much higher on Mainnet and Devnet, due to how critical these networks are. In order to continue, we must have a total of 3 nodes on our Testnet network because that is the minimum in order for it to continue forging. It is possible for the seed node to forge on its own because that is running in “test” mode, which allows forging on the same machine regardless of peers on the network.

So, what we will need to do at this point is set up our 2 new nodes. We’ll call these `delegate-1` and `relay-1`. The easiest way to go about adding these new nodes to the network is to run the core Deployer process (from the very first step in this guide) but on the new servers. Go ahead and do that now until you have installed core on both, but don’t yet start core on either.

**Switching config details to our forked repository**

Now that we have 2 newly deployed nodes ready for our network, we need to update the codebase to use our forked repository which we set up in our previous step.

Change the origin to match the GitHub repo. As all GitHub forks are made public automatically, you can simply use the HTTPS URL unless you plan on making code changes directly on the new servers.

```sh
$ cd ~/core-bridgechain
$ git remote set-url origin [https://github.com/alexbarnsley/core.git](https://github.com/alexbarnsley/core.git)
$ git fetch --all
$ git checkout packages
$ git pull
```

![](https://cdn-images-1.medium.com/max/1600/1*D-8U27SGyzm6lHMrGl7-MA.png)

Now we’ve updated our files, we need to rebuild Core. This is important to make sure the new config files are used:

```sh
$ yarn setup
```

![](https://cdn-images-1.medium.com/max/1600/1*zYV9qwj-5kF_n1ldP1WTvA.png)

The successful output of Core setup.

#### Register a delegate on the network

Now that we are ready with the codebase, we need to register our delegate with the network.

In the Desktop Wallet, create a new wallet. You do this by going to the Wallet List (the wallet icon in the sidebar) and clicking “_Create wallet_”. Choose an address (refresh until you find one you like), and click “_Next_”. Write your passphrase down, and press “_Next_”. Fill in the 3 missing words and continue to the next step. Encrypt the wallet passphrase if you want to, and on the final step, choose a name.

Once you press “_Done_” to save your wallet, you will be taken to the wallet page. What we need to do first, however, is go back to the Genesis Wallet we set up earlier in this guide and send us some tokens so we can register our own delegate name. We’ve covered that also, so head to the Genesis Wallet and click “_Send_”. Make sure you select the new delegate wallet as the recipient:

![](https://cdn-images-1.medium.com/max/1600/1*9M7JQi72cjyZs-OtAVTttw.png)

The number of tokens shouldn’t matter too much, but we will just send over 5000 for now.

![](https://cdn-images-1.medium.com/max/2400/1*Dz1OIdDm0lQK6ZKhsuNLPA.png)

New delegate wallet after receiving tokens from our genesis wallet.

Now we need to register the delegate name. Click on the button with 3 vertical dots, next to the “_Send_” button on the wallet page. You will now see a new series of additional buttons. Click on “_Register delegate_” to open the form for delegate registrations.

![](https://cdn-images-1.medium.com/max/1600/1*7X6VNgyM1sRMqNEJD8emaA.png)

Enter a username and your passphrase (or encrypted password), and click “Next”. We left the transaction fee because we’re still using static fees (unless you set up your Bridgechain differently).

![](https://cdn-images-1.medium.com/max/1600/1*XOwLii9ePRaaIOoHy2y5qg.png)

Confirm all the details on the transaction confirmation window, and press “_Send_” once you’re happy.

![](https://cdn-images-1.medium.com/max/1600/1*NAdL7AOXsuuoSRjSGLVYjg.png)

Now if you head over to your Explorer, the most recent transaction for a delegate registration will be showing there. You can click the wallet name (in my case, “alexbarnsley”) to view the wallet. At the top of the wallet, there will be an area specifically visible for registered delegates on the network.

![](https://cdn-images-1.medium.com/max/1600/1*HoAu-iwzK5LurplKXOLIlg.png)

#### Set up relay server & delegate server for forging

Now that we have a delegate ready for forging, we can now set up Core. We will use the built-in Core CLI to manage the new nodes.

We will start by publishing our node’s config. This will copy across the necessary config files to a standard config path `~/.config/MyBridgechain`:

```sh
$ cd ~/core-bridgechain
$ ./packages/core/bin/run config:publish --token=MyBridgechain
```

This will then ask which network we want to use — choose “testnet” from the options (you can also pass in `--network=testnet` to the command to skip the confirmation)

![](https://cdn-images-1.medium.com/max/1600/1*KmWliZnEOgDB8952G587eg.png)

Confirm your choice and the details will be saved.

![](https://cdn-images-1.medium.com/max/1600/1*1MJYJKTLwRjh80uRiXZUvw.png)

Now that we have configured our Core, we need to update the peers for our 2 new nodes, otherwise, they will never talk to each other. Open up the new `peers.json` file here `~/.config/MyBridgechain-core/testnet/peers.json` and add in all the peers on the network, so it looks like (Don’t forget to change the IPs to your own!):

```json
{
  "list": [
    {
      "ip": "95.216.157.210",
      "port": 4102
    },
    {
      "ip": "95.216.166.203",
      "port": 4102
    },
    {
      "ip": "195.201.90.217",
      "port": 4102
    }
  ],
  "sources": []
}
```

The next step in our configuration is to clear out the `delegates.json` file `~/.config/MyBridgechain-core/testnet/delegates.json`. With the delegate forging node, `delegate-1`, we need to add our new delegate passphrase. Leave the list empty for `relay-1`. It should end up looking like the following for `delegate-1`:

```json
{
  "secrets": [
    "your passphrase"
  ]
}
```

And should look like the following for `relay-1`:

```json
{
  "secrets": []
}
```

Now we need to start the forger on `delegate-1`. Run the command:

```sh
$ ./packages/core/bin/run forger:start
```

Once started, we will need to start our relay on both `delegate-1` and `relay-1`:

```sh
$ ./packages/core/bin/run relay:start
```

![](https://cdn-images-1.medium.com/max/1600/1*AqXD6cnaLfJy8F4oqF4Ypg.png)

Once the 2 new nodes are running, it can take a few minutes for the relays to kick in and catch up with the seed relay we have set up. Once it has, it will start receiving blocks and then broadcasting them again.

![](https://cdn-images-1.medium.com/max/1600/1*guvKwP7p3Cy2lH3g7Tg_rA.png)

Because none of the genesis delegates have any vote weight, it is possible for your newly created delegate to appear in the list of forgers due to how the forging order works.

#### Voting for your own delegate

This is the crucial part. To make sure we remain within the active forger list, we need to vote for our own delegate. We will do this from within the desktop wallet.

Open up your desktop wallet and go to the delegate wallet we created earlier. From here, click on the “_Delegates_” tab.

![](https://cdn-images-1.medium.com/max/2400/1*FB7coJjN8cTsBKFTtbnfAQ.png)

![](https://cdn-images-1.medium.com/max/1600/1*EkLG3JwrWQRVj8JpPKNi_w.png)

Find your delegate (sorting by Username can help)

Find our new delegate in the list, and click on it to view the details. Then click on the “_Vote_” button at the bottom.

![](https://cdn-images-1.medium.com/max/1600/1*IVa9wXm_ALICUeWVzKmQXA.png)

Once you’ve entered your passphrase or encryption password, you’ll be presented with the usual confirmation window. Press “_Send_” once you’re happy.

![](https://cdn-images-1.medium.com/max/1600/1*AZV9j-ZWD4PJvty51WgYTQ.png)

As soon as the Vote transaction is applied and the current forging round ends, the delegate will go up to Rank 1 due to the genesis delegates having no vote weight.

![](https://cdn-images-1.medium.com/max/2400/1*zJoeCIcokyFfEffL7HB0hg.png)

After a short while, you will be able to see blocks get processed. This will be reflected both in Explorer and in the logs.

![](https://cdn-images-1.medium.com/max/2400/1*fAHmUbqD9Hjxxnfc7ivSDg.png)

![](https://cdn-images-1.medium.com/max/2400/1*8g4oxV07BdWAQvG5YqLmkQ.png)

### Conclusion

Well, there you have it. Your very own Testnet network with your own forging delegate running on an independent node. The same process can be done with Mainnet and Devnet, however, you will need to add many more peers to the network to ensure blocks are forged and the network continues to move forward. This is also important to avoid scenarios such as “split brain” chains, where multiple forks can become the correct chain at the same time.

### Your Next Steps

Get your Mainnet peers set up and ready to secure the network (do the same with Devnet if you need one). It is best to also move your genesis delegate passphrases at the same time. For example, add 51 relay nodes to the network, and split up the 51 delegate passphrases into the new nodes. This removes the single-point failure that could result in the entire network going down if the single forging node stops working (the node you used to set up the Bridgechain).

You also need to secure the pre-mine tokens in the Genesis Wallet. In the majority of networks, these tokens are critical for the lifetime of the network so losing them could be a major problem for your networks.

### JSON Config File

There is also a sample JSON config file provided for Deployer. This config file provides all possible options making it easy to determine what can be changed when deploying your own chain. A basic example JSON file:

```json
{
    "coreIp": "0.0.0.0",
    "p2pPort": 4102,
    "apiPort": 4103,
    "explorerIp": "127.0.0.1",
    "explorerPort": 4200
}
```

This can simply be used with the following command:

```sh
$ ./bridgechain.sh install-core --config /path/to/config.json
```

You can read more about the JSON config file [here](https://github.com/ArkEcosystem/deployer#json-config), and find the sample config file [here](https://github.com/ArkEcosystem/deployer/config.sample.json).

### FAQ

1. **I lost my Genesis Passphrase. Where can I find it?**
    Assuming you still have access to your original deployment server, you will be able to find the genesis wallet passphrase in `~/.bridgechain/NETWORK/NETWORK_NAME/genesisWallet.json`, replacing `NETWORK` with the network name (mainnet, devnet or testnet), and replacing `NETWORK_NAME` with the name used to deploy (E.g. “MyBridgechain”).
2. **Will Deployer work on XYZ Operating System?**
    We recommend running ARK Core on Ubuntu 18 and upwards. It may be possible on other operating systems, but it is more specifically tested on this particular version.
3. **Can I change the fees for my Bridgechain?**
    Absolutely! You can change the fees just like with many other options. It does get a little complicated when dealing with Dynamic Fees, which is functionality that comes with Core v2, but you can see specific options for Static Fees [here](https://github.com/ArkEcosystem/deployer#static-fees), and Dynamic Fees [here](https://github.com/ArkEcosystem/deployer#dynamic-fees-more-information) to get a better understanding.
4. **What is a Seed Node?**
    A Seed Node is used as a master node. It is a node that is used as a basis for peers to connect with, to then become “attached” to the Network.

> **You can use our Github to report issues or provide some feedback for improvements:** [**https://github.com/arkecosystem/deployer/issues**](https://github.com/arkecosystem/deployer/issues)
