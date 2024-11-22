# Deploying Parachains via the UI

To deploy a new Perfuse network, ensure your Next.js application is running, then navigate to [http://localhost:3000](http://localhost:3000).

## Step-by-Step Guide

### **Step 1: Access the Setup Page**
Visit the URL, and you’ll land on the **Set Up Your Parachain** page.

### **Step 2: Select the Network Environment**
Choose the environment where your parachain will operate:

- **Testnet**
  - Paseo
- **Mainnet**
  - Kusama
  - Polkadot

### **Step 3: Enter Chain Details**
Provide the following details for your parachain:
- **Chain Name**: The name of your parachain.
- **Token Symbol**: The symbol representing your chain’s token.

### **Step 4: Choose a Template**
Select a template for your parachain. Options include:
- **Substrate**
- **EVM Frontier**
- **Contract**
- **Assets**
- **Custom**

> **Note:** If you select the **Custom** template, you must upload a valid chain specification file and binary to proceed.

### **Step 5: Configure Advanced Options**
Once you select a template, advanced options will auto-fill. You can modify these values as needed or leave them as is. Key parameters include:

- **ParaID**: ID of the new parachain.
- **Token Decimal**: Decimal places for the network’s token.
- **RPC API**: Enable or disable HTTPS/WSS support.
- **Sidecar**: Enable or disable sidecar support.
- **SS58 Format**: Specify the SS58 format for your parachain network.
- **Protocol ID**: Derived from the chain specification.
- **ID**: Unique identifier for the parachain.
- **Sudo Key**: Wallet address with administrative privileges.
- **Collator Accounts / Premined Accounts**:
  - **Address**: Wallet address of the collator or account.
  - **Session Key**: Session key for the account.
  - **Balance**: Initial balance for the account.

### **Step 6: Review Your Selection**
Review all the filled details in the **Your Selection** section. Ensure everything is accurate.

### **Step 7: Deploy the Parachain**
After confirming the information, click **Deploy** to launch your parachain network.
