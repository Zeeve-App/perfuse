
## Deploy parachains from the UI.

Once the next.js application is running, you can go to http://localhost:3000 to deploy a new perfuse network.

**Step 1:** Once you go to the URL, you will land on the Deploy New Parachain screen. You can click on Begin Now to go to the Create page.

**Step 2:** Once on the create page, you can select the network environment. 
 - devnet
 -  testnet
 - mainnet

**Step 3:** Once the environment is selected, you will see the template option. You can select one to continue.
 - Substrate
 - Evm frontier
 - contract
 - assets
 - custom
 
**Step 4:** Select the relay chain, which depends on your network environment.
 - rococo-local
 - rococo
 - kusama
 - polkadot

**Step 5:** Select whether to include a sidecar or not.

**Step 6:** Select the explorer to use on the network.
 - polkadot.js
 - subscan
 
**Step 7:** Click on the next button to see the chain spec file details and enter the RPC node details.

**Step 8:** In the parachain configuration section, all the details are fetched from the chain specification file (either from the template chain specification or the user-uploaded chain specification). You can edit the token name to your liking. It will change the chain file token name.

**Step 9:** In the collator nodes section, you can see the two collator node details, which will be created by default.

**Step 10:** In the RPC nodes section, you can enter the RPC name and choose if you want to enable the HTTP endpoint or not.

**Step 11:** Now you can deploy the network by clicking on the deploy button.
