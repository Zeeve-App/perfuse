# Register and View Parachain

After initiating the deployment process, you can monitor and manage your parachain through the UI.

## **Access Network Details**

Once the deployment begins, navigate to [http://localhost:3000](http://localhost:3000). This will open the **Network Details** page, where you can view information about the deploying network and its current status.

---

## **Register the Network**

After deployment completes, an alert will notify you to register the parachain. To do this:

1. Go to the **Coretime** page in the navigation menu.
2. Follow the instructions to complete the parachain registration.

---

## **Overview**

### **Parachain Details**

This section provides general information about the parachain:

- **Network Name**: Extracted from the chain specification.
- **ID**: Unique identifier of the network in the database.
- **Environment**: The environment where the parachain is deployed (e.g., testnet or mainnet).
- **Owned By**: The owner of the network.
- **Status**: Current status of the network:
  - **In Progress**: Deployment is ongoing.
  - **Failed**: An error occurred during deployment.
  - **Authentication Pending**: Deployment is complete, but parachain registration is required.
- **Created On**: Timestamp of when the network was created.

---

### **Blockchain Config**

This tab provides an in-depth look at the parachain’s blockchain configuration:

#### **Key Details**
- **Parachain Block Height**: Current block height after registration.
- **Total Token Supply**: Calculated from the chain specification file.
- **Parachain Config**: Detailed information from the chain spec:
  - **Parachain Name**: Name of the parachain.
  - **Parachain ID**: ID assigned to the parachain.
  - **Network ID**: Network ID from the chain specification.
  - **Chain Type**: Type of chain (e.g., local, testnet, mainnet & live).
  - **Protocol ID**: Protocol ID defined in the chain spec.
  - **Telemetry Endpoint**: URL for telemetry monitoring.

#### **Token Information**
- **Token Name**: Symbol of the parachain’s native token.
- **Decimal**: Decimal places for the token.
- **Encoding**: Encoding value from the chain specification.
- **Candidacy Bond**: Bond value for candidacy, extracted from the chain spec.

#### **Additional Details**
- **Parachain Spec File**: The chain specification file used for deployment. You can download it by clicking the **Download** button.
- **Pre-mined Addresses**: List of pre-mined accounts and their respective balances.
- **Relay Chain Config**: Information about the relay chain where the parachain is deployed.

---

### **Collator Nodes**

View and manage collator nodes deployed for your parachain. Each collator node entry includes:

- **Node ID**: Unique identifier of the node in the database.
- **Node Name**: Saved node name in the database.
- **Status**: Current status of the node.
- **Created On**: Timestamp of when the node was created.
- **Parachain Block Height**: Current block height of the parachain.
- **Collator Address**: Wallet address of the collator.

Click the **"i"** icon to view additional details for a specific node.

---

### **RPC Nodes**

View and manage RPC nodes for the parachain. Each RPC node entry includes:

- **Node ID**: Unique identifier of the node in the database.
- **Node Name**: Saved node name in the database.
- **Status**: Current status of the node.
- **Created On**: Timestamp of when the node was created.
- **Parachain Block Height**: Current block height of the parachain.
- **Parachain HTTP URL**: HTTP endpoint for blockchain access.
- **Parachain WS URL**: WebSocket endpoint for blockchain access.
- **Sidecar HTTP URL**: HTTP endpoint for sidecar access.
- **Authentication Type**: Method used to authenticate API access.
- **Authentication API Key**: API key for the endpoint.
- **Allowed CORS**: Allowed origins for cross-origin requests.

Click the **"i"** icon to view additional details for a specific node.
