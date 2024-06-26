# Perfuse Setup

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
npm install
npm run build
npm run start
```
It will start the server in port 3000. You can go to the http://localhost:3000/ and create the parachain from UI.

