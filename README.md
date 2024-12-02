# Perfuse Setup

## System Requirements

Make sure your system is ready to harness the power of Perfuse! 🚀

### ✅ Minimum Requirements for Testnet:

Your project will take flight with these basic specs:

- **Operating System:**

  - 🐧 Linux (Ubuntu 20.04+ recommended)

- **Hardware:**
  - **🧠 Processor:** 4 Cores or more
  - **💾 Memory:** 8GB RAM or more
  - **💽 Storage:** 250GB available disk space or more

---

### 🚀 Recommended Requirements for Testnet:

For the smoothest, most optimal experience, we recommend:

- **Operating System:**

  - 🐧 Linux (Ubuntu 22.04 LTS)

- **Hardware:**
  - **🧠 Processor:** 8 Cores or more
  - **💾 Memory:** 16GB RAM or more
  - **💽 Storage:** 800GB available disk space

---

### ✅ Minimum Requirements for Mainnet:

Your project will take flight with these basic specs:

- **Operating System:**

  - 🐧 Linux (Ubuntu 20.04+ recommended)

- **Hardware:**
  - **🧠 Processor:** 8 Cores or more
  - **💾 Memory:** 12GB RAM or more
  - **💽 Storage:** 2TB available disk space or more

---

### 🚀 Recommended Requirements for Mainnet:

For the smoothest, most optimal experience, we recommend:

- **Operating System:**

  - 🐧 Linux (Ubuntu 22.04 LTS)

- **Hardware:**
  - **🧠 Processor:** 8 Cores or more
  - **💾 Memory:** 16GB RAM or more
  - **💽 Storage:** 2.5TB available disk space

---

### ✅ Install the minimum tools required to run the Perfuse smoothly:

## Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

## Install nodejs

```bash
nvm install 20
```

## Install Make Tools

```bash
sudo apt install make -y
```

## Clone repository & change directory

```bash
git clone https://github.com/Zeeve-App/perfuse.git
cd perfuse
```

## Install nodejs dependency and start the server locally

```bash
cp .env.exampe .env
npm install
npm run build
npm run start
```

It will start the server in port 3000. You can go to the http://localhost:3000/ and create the parachain from UI.

## Alternatively start the server on 0.0.0.0 using pm2

```bash
cp .env.example .env
npm i
npm run build
npm i -g pm2
pm2 start npm --name "perfuse" -- start -- -H 0.0.0.0
```

## License

- Perfuse application source is licensed under GNU AGPLv3 [license](https://github.com/Zeeve-App/perfuse/blob/main/license)
