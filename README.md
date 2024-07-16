# Perfuse Setup

## System Requirements

Make sure your system is ready to harness the power of Perfuse! 🚀

### ✅ Minimum Requirements for Devnet:

Your project will take flight with these basic specs:

- **Operating System:**

  - 🐧 Linux (Ubuntu 20.04+ recommended)

- **Hardware:**
  - **🧠 Processor:** 4 Cores or more
  - **💾 Memory:** 8GB RAM or more
  - **💽 Storage:** 100GB available disk space

---

### 🚀 Recommended Requirements for Devnet:

For the smoothest, most optimal experience, we recommend:

- **Operating System:**

  - 🐧 Linux (Ubuntu 22.04 LTS)

- **Hardware:**
  - **🧠 Processor:** 8 Cores or more
  - **💾 Memory:** 16GB RAM or more
  - **💽 Storage:** 100GB available disk space

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
sudo apt install make
```

## Clone repository & change directory

```bash
git clone https://github.com/Zeeve-App/perfuse.git
cd perfuse
```

## Install nodejs dependency and start the server

```bash
cp .env.exampe .env
npm install
npm run build
sudo npm run start
```

It will start the server in port 3000. You can go to the http://localhost:3000/ and create the parachain from UI.

## License

- Perfuse application source is licensed under GNU AGPLv3 [license](https://github.com/Zeeve-App/perfuse/blob/main/license)
