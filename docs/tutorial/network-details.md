## Register and view parachain

Once the deployment process is started you can see the details of the deploying network.


go to the http://localhost:3000, it will open the network details page. You can see the network details there and status of the network.

### Register the network
Once the network is deployed you will see a alert that you need to register the parachain, you can follow the go in the **Coretime** page from sidebar to register you parachain

### Overview

**Parachain Details** - in this section you can see the general information related to the network. 
- network name - network name from chain spec
- ID - network uuid in db
- Description -  network description
- Environment -  environment network is deployed in
- Owned by -  owner of the network
- status -  status of the network
    - in progress - while network is deploying
    - failed - if there is some error while deploying network
    - authentication pending - when the network is deployed but user need to register parachain
- Blockchain Provision Time - time it took to deploy the network
- Duration - Duration of the created network
- Created on - timestamp of the network creation

**Blockchain Config** - Overview of the blockchain config you can see more detailed information in blockchain config tab.

**Nodes** - Overview of the recently deployed node. You can see the more detailed information in the rpc nodes / collator node tab.

### Blockchain config

in this tab you can see the details of the blockchain

**Parachain Block Height** - Height of the parachain after the parachain is register.

**Total token supply** - Total token supply (calculated from the chain spec file)

**Parachain Config** - details about parachain from chain spec file.
- Parachain name - name of the parachain
- Parachain Id - Id of the deployed parachain
- Network Id - network id defined in chain spec
- Chain type - Chain type of the deployed parachain
- protocol Id - protocol id defined in chain spec
- Telemetry endpoint - defined in the chain spec

**Token Info** - Information about the token
- Token name - Token symbol of the native tokens of the created parachain
- Decimal - Decimal for the token
- Encoding - Encoding value in chain spec
- Candidacy Bond - Candidacy bond value from chain spec

**Parachain Spec File** -  chain spec file for the network, You can download it by clicking in the download button

**Pre mined Address** - In this section, You can see the account address and their balance which are pre mined.

**Relay Chain Config** - Details about the relay chain in which the parachain is deployed.

### Collator nodes
Here you can see the list of the collator node, and by clicking on the "i" icon, you can see the details of the specific node
- node id -  saved uuid in db for this node
- node name - saved node name in db
- status - status of the node
- created on - timestamp of creation
- parachain block height -  height of the parachain
- collator address - address of the collator node

### Rpc nodes
Here you can see the list of the Rpc node, and by clicking on the "i" icon, you can see the details of the specific node
- node id -  saved uuid in db for this node
- node name - saved node name in db
- status - status of the node
- created on - timestamp of creation
- parachain block height -  height of the parachain
- Parachain http url - parachain http endpoint to access blockchain
- Parachain ws url - parachain ws endpoint to access blockchain
- relay chain http url - relay chain http endpoint to access blockchain
- relay chain ws url - relay chain ws endpoint to access blockchain
- side car http url - http endpoint to access side car
- authentication type - Authentication method to access the endpoints
- Authentication API key - api key for the endpoint
- Allowed cors - allowed origins

