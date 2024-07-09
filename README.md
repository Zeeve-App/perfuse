# Perfuse Setup

## System Requirements

Before you get started, make sure your system meets the following requirements:

## Minimum Requirements:

* **Operating System:**
    - Linux (Ubuntu 20.04+ recommended)

* **Hardware:**
    - **Processor:** 4 Cores or more
    - **Memory:** 16GB RAM or more
    - **Storage:** 100GB available disk space

## Recommended Requirements:

* **Operating System:** 
    - Linux (Ubuntu 22.04 LTS) 

* **Hardware:**
    - **Processor:** 6 Cores or more
    - **Memory:** 32GB RAM or more
    - **Storage:** 100GB available disk space

## Install nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
## Install nodejs
```bash
nvm install node
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

