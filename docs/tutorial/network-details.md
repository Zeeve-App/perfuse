# Register and View Parachain

After initiating the deployment process, you can monitor and manage your parachain through the Perfuse UI.

---

## **Accessing Network Details**

Once deployment begins, navigate to [http://localhost:3000](http://localhost:3000) to access the **Network Details** page. Here, you can view the status and information about your deploying network.

---

## **Registering the Parachain**

Upon successful deployment, you will be prompted to register the parachain. Follow these steps to complete registration:

1. Navigate to the **Coretime** page via the navigation menu.
2. Follow the on-screen instructions to register your parachain.

---

## **Checking Wallet Balances**

After setting up the network, you can check wallet balances by allowing the Perfuse app to access your Polkadot.js wallet. The app will display balances in the relay chain where the parachain is deployed.

---

## **Overview**

### **Parachain Details**

This section provides a summary of the parachain, including:

- **Network Name**: Derived from the chain specification file.
- **ID**: Unique identifier assigned to the network in the database.
- **Environment**: Deployment environment (e.g., testnet or mainnet).
- **Owned By**: Network owner information.
- **Status**: Current network status:
  - **In Progress**: Deployment ongoing.
  - **Failed**: Deployment encountered an error.
  - **Authentication Pending**: Deployment completed but awaiting parachain registration.
- **Created On**: Timestamp of network creation.

---

### **Blockchain Config**

The **Blockchain Config** tab displays comprehensive details about the parachain’s configuration:

#### **Key Metrics**
- **Parachain Block Height**: Current block height after registration.
- **Total Token Supply**: Calculated from the chain specification file.
- **Parachain Config**: Includes:
  - **Parachain Name**
  - **Parachain ID**
  - **Network ID**
  - **Chain Type** (local, testnet, mainnet, live)
  - **Protocol ID**
  - **Telemetry Endpoint**: Monitoring URL.

#### **Token Information**
- **Token Name**: Native token symbol.
- **Decimal Places**: Precision of the token.
- **Encoding**: Encoding format as per chain spec.
- **Candidacy Bond**: Bond value for candidacy, extracted from the chain spec.

#### **Additional Information**
- **Parachain Spec File**: Chain specification file used for deployment, downloadable via the **Download** button.
- **Pre-mined Accounts**: List of accounts with pre-allocated balances.
- **Relay Chain Config**: Details of the relay chain hosting the parachain.

---

### **Collator Nodes**

Manage collator nodes for the parachain under the **Collator Nodes** section. Each collator entry includes:

- **Node ID**: Database identifier.
- **Node Name**: Saved node name.
- **Status**: Current status of the node.
- **Created On**: Creation timestamp.
- **Parachain Block Height**: Current parachain block height.
- **Collator Address**: Collator wallet address.

#### **Adding a Session Key**
To add a session key for a collator node:

1. Click the **key icon** next to the collator node.
2. Enter the seed phrase and wallet address in the modal.
3. Submit the form to create an RPC call and save the keys.

---

### **RPC Nodes**

View and manage RPC nodes for the parachain under the **RPC Nodes** section. Each RPC node entry includes:

- **Node ID**: Database identifier.
- **Node Name**: Saved node name.
- **Status**: Current node status.
- **Created On**: Node creation timestamp.
- **Parachain Block Height**: Current parachain block height.
- **Endpoints**:
  - **HTTP URL**: HTTP endpoint for blockchain access.
  - **WS URL**: WebSocket endpoint for blockchain access.
  - **Sidecar URL**: HTTP endpoint for Sidecar access.
- **Authentication**:
  - **Type**: Method for API authentication.
  - **API Key**: Key for accessing the RPC API.
- **CORS Settings**: Allowed origins for cross-origin requests.

#### **Additional Details**
Click the **info icon** to view detailed information about a specific node.

---

This streamlined guide ensures you can effectively monitor and manage your parachain from deployment to operation.
