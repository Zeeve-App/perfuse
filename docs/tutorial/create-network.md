# Deploying Parachains via Perfuse UI

To deploy a new Perfuse network, ensure your Next.js application is running, then navigate to [http://localhost:3000](http://localhost:3000).

## Step-by-Step Guide

---

### **Step 1: Setup Environment**
Before starting, configure the environment by editing the `.env` file. You can base it on `.env.example`:

- **`NEXT_PUBLIC_HOST`**: Host address where the Next.js app is running.
- **`NEXT_PUBLIC_BASE_PATH`**: Base sub-path to append to the host address.
- **`NEXT_PUBLIC_EXPLORER_POLKADOT`**: Public explorer URL for viewing blockchain details (RPC URL is appended as query params).
- **`SQLITE_DB_LOCATION`**: File path for storing SQLite database data.
- **`JWT_EXPIRES`**: Token expiry time in hours for login sessions.
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **`DEFAULT_EMAIL`**: Default email for logging in.
- **`DEFAULT_PASS`**: Default password for logging in.

---

### **Step 2: Access the Setup Page**
Navigate to the web application URL. You’ll land on the **Set Up Your Parachain** page.

---

### **Step 3: Select the Network Environment**
Choose the environment where the parachain will operate:

- **Testnet**
  - Paseo
- **Mainnet**
  - Kusama
  - Polkadot

---

### **Step 4: Enter Chain Details**
Provide essential details about your parachain:

- **Chain Name**: Name of the parachain.
- **Token Symbol**: Symbol representing the parachain token.

---

### **Step 5: Choose a Template**
Select a template for your parachain from the following options:

- **Substrate**
- **EVM Frontier**
- **Contract**
- **Assets**
- **Custom**

> **Note:** If selecting **Custom**, upload a valid chain specification file and binary to proceed.

---

### **Step 6: Configure Advanced Options**
Advanced options will auto-fill based on the selected template. You can modify these values if necessary:

- **ParaID**: ID of the new parachain.
- **Token Decimal**: Decimal precision for the chain’s token.
- **RPC API**: Enable/disable HTTPS/WSS support.
- **Sidecar**: Enable/disable Sidecar support.
- **SS58 Format**: SS58 format for address encoding.
- **Protocol ID**: Derived from the chain spec.
- **ID**: Unique identifier for the parachain.
- **Sudo Key**: Administrative wallet address.
- **Collator Accounts / Premined Accounts**:
  - **Address**: Wallet address of collators/accounts.
  - **Session Key**: Session key for the account.
  - **Balance**: Initial balance allocation.

---

### **Step 7: Review Your Selection**
Verify all the details in the **Your Selection** section. Confirm accuracy before proceeding.

---

### **Step 8: Deploy the Parachain**
Once verified, click **Deploy** to launch your parachain network.

---

This streamlined process ensures a seamless deployment experience for your Perfuse network!
