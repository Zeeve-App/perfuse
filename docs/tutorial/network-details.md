## Register and view Parachain

Once the deployment process is started, you can see the details of the deploying network.

Go to http://localhost:3000, and it will open the network details page. You can see the network details there and the status of the network.

### Register the network
After the network deployment, you will receive an alert indicating the need to register the parachain. You can follow the instructions on the **Coretime** page in the sidebar to register your parachain.

### Overview

**Parachain Details**: In this section, you can see general information related to the network. 
- network name: network name from chain specification
- ID: network uuid in DB
- Description: network description
- Environment: The environment network is deployed in
- Owned by:  the owner of the network
- status:  status of the network
    - in progress: while the network is deploying
    - failed: if there is some error while deploying the network.
    - authentication pending: when the network is deployed but the user needs to register parachain.
- Blockchain Provision Time: time it took to deploy the network
- Duration: Duration of the created network
- Created on: timestamp of the network creation

**Blockchain Config**: An Overview of the Blockchain Config You can see more detailed information in the blockchain config tab.

**Nodes**: Overview of the recently deployed node. You can see more detailed information in the RPC nodes/collator node tab.

### Blockchain config

In this tab, you can see the details of the blockchain.

**Parachain Block Height**: Height of the parachain after the parachain is registered.

**Total token supply**: Total token supply (calculated from the chain spec file)

**Parachain Config**: Details about Parachain from the Chain Spec File.
- Parachain name: name of the parachain
- Parachain ID: ID of the deployed parachain
- Network ID: network ID defined in the chain specification
- Chain type: Chain type of the deployed parachain
- protocol ID: protocol ID defined in chain specification
- Telemetry endpoint: defined in the chain spec

**Token Info**: Information about the token
- Token name: Token symbol of the native tokens of the created parachain
- Decimal: Decimal for the token
- Encoding: Encoding value in chain specification
- Candidacy Bond: Candidacy bond value from chain specification

**Parachain Spec File**:  chain spec file for the network. You can download it by clicking on the download button.

**Pre-mined Address**: In this section, you can see the account address and their balance, which are pre-mined.

**Relay Chain Config**: Details about the relay chain in which the parachain is deployed.

### Collator nodes
Here you can see the list of the collator node, and by clicking on the "i" icon, you can see the details of the specific node.
- node id: saved uuid in DB for this node
- node name: saved node name in db
- status: status of the node
- created on: timestamp of creation
- parachain block height: height of the parachain
- collator address: address of the collator node

### Rpc nodes
Here you can see the list of the Rpc node, and by clicking on the "i" icon, you can see the details of the specific node.
- node id: saved uuid in DB for this node
- node name: saved node name in db
- status: status of the node
- created on: timestamp of creation
- parachain block height: height of the parachain
- Parachain http url: parachain http endpoint to access blockchain
- Parachain ws url: parachain ws endpoint to access blockchain
- relay chain http url: relay chain http endpoint to access blockchain
- relay chain ws url - relay chain ws endpoint to access blockchain
- side car http url: http endpoint to access side car
- authentication type: authentication method to access the endpoints
- Authentication API key: API key for the endpoint
- Allowed cors: allowed origins

