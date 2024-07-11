
## Deploy parachain from UI

Once the next js application is running you can go to the http://localhost:3000 to deploy a new perfuse network.

**Step 1 -** Once you go to the url, You will land on the Deploy new parachain screen, You can click on begin now. to go to the create page.

**Step 2 -** Once in create page you can select the network env. 
 - devnet
 -  testnet
 - mainnet

**Step 3 -** Once the enviorment is selected. You will see the template option. You can select one to continue.
 - Substrate
 - Evm frontier
 - contract
 - assets
 - custom
 
**Step 4 -** Select the relay chain, its depenend upon your network env option.
 - rococo-local
 - rococo
 - kusama
 - polkadot

**Step 5 -** Select if include sidecar or not.

**Step 6 -** Select the explorer to use in the network.
 - polkadot.js
 - subscan
 
**Step 7 -** Click on the next button, to see the chain spec file details and enter rpc node details

**Step 8 -** In parachain configuration section all the details are fetched from the chain spec file (either from template chain spec or user uploaded chain spec). You can edit the token name to your liking. it will change the chain file token name.

**Step 8 -** In collator nodes section, You can see the two collator nodes details which will be created by default.

**Step 9 -** In Rpc nodes, section you can enter rpc name and choose if you want to enable the http endpoint or not.

**Step 10 -** Now you can deploy the network by clicking on the deploy button
