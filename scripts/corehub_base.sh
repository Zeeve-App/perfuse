#!/bin/bash

set -e
set -u

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
#Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
  echo "Env Variables Loaded"
else
  echo "ERROR: .env file not found."
  exit 1
fi

ACCOUNT_ADDRESS="5GNWXKseTR19wMDhHxxyGkeDokTcyE42ivJgxWiZn5PFuQJ8"
# New zombienet_args value
NEW_ARGS='-d /home/perfuse/zombienet/data -p native spawn ./zombienet/network.toml'
# Ports of services which required to connect to CoreHub
export PORTS=(9900 9910 9920)
export HOST_IP=$(curl -4 ifconfig.io)
block_number_reached=false

# Adding Directory and Permissions
sudo mkdir -p /home/perfuse/{regionx,zombienet}
sudo chown -R $USER: /home/perfuse/{regionx,zombienet}

# Moving to Regionx Dir
pushd /home/perfuse/regionx
git clone https://github.com/RegionX-Labs/Coretime-Mock.git && cd Coretime-Mock

# Check if the 2000 PARA ID exists in the file
if grep -q "id = 2000" "./zombienet/network.toml"; then
    # Replace the ID to 3000
    sed -i "s/id = 2000/id = 3000/" "./zombienet/network.toml"
    sed -i "s+zombienet_args=.*+zombienet_args=\"$NEW_ARGS\"+" ./scripts/run_zombienet.sh
    echo "Parachain ID successfully updated from 2000 to 3000"
else
    echo "Parachain ID 2000 not found in network file"
fi

# Downloading Zombienet Binary
if [ ! -f "/usr/local/bin/zombienet-linux" ]; then
wget https://github.com/paritytech/zombienet/releases/latest/download/zombienet-linux-x64
chmod +x zombienet-linux-x64
sudo mv zombienet-linux-x64 /usr/local/bin/zombienet-linux
fi

zombienet-linux setup -y polkadot polkadot-parachain && export PATH=/home/perfuse/regionx/Coretime-Mock:$PATH
mkdir -p bin && mv polkadot* bin/
wget https://github.com/rahul-mnz/squid-k8s/releases/download/test/regionx-node -P bin/ && chmod +x bin/regionx-node

npm i -g pm2
pm2 start npm --name "zombienet" -- run zombienet

while [ "$block_number_reached" = false ]; do
    for PORT in "${PORTS[@]}"; do
        echo "Checking port $PORT..."

        # Get the block number and store it in a variable
        block_number=$((` curl --silent localhost:9900 -X POST -H "Content-Type: application/json" --data '{"method":"chain_getBlock","params":[],"id":1,"jsonrpc":"2.0"}' | jq -r '.result.block.header.number' `))
        # Check if curl was successful (status code 0)
        if [ $? -ne 0 ]; then
            echo "Error: Failed to connect to localhost:$PORT"
            continue  # Skip to the next port
        fi

        # Check if block number is greater than 1
        if (( block_number > 1 )); then
            echo "Success: Block number on port $PORT is $block_number (greater than 1)"
            block_number_reached=true
        else
            echo "Warning: Block number on port $PORT is $block_number (not greater than 1)"
        fi
    done

    sleep 20
done

npm i
pm2 start --no-autorestart "npm run init -- --coretimeInit --regionxInit --coretimeAccount $ACCOUNT_ADDRESS --regionxAccount $ACCOUNT_ADDRESS"
# Switching back to previous directory

# Setting CoreHub UI
cd ../ && git clone https://github.com/RegionX-Labs/CoreHub.git && cd CoreHub

# sed -i "s/$HOST_IP/$HOST_IP/g" Dockerfile
# sudo docker build -t corehub .
# sudo docker run --name corehub-ui --rm -it -d --read-only -p 3030:3000 corehub
# Installing dependencies

export WS_ROCOCO_RELAY_CHAIN="ws://$HOST_IP:9900"
export WS_ROCOCO_CORETIME_CHAIN="ws://$HOST_IP:9910"
export WS_REGIONX_COCOS_CHAIN="ws://$HOST_IP:9920"
export EXPERIMENTAL=false

npm i && npm run build
# # Starting the Corehub ( RegionX ) UI
pm2 start npm --name "corehub" -- start -- -H 0.0.0.0 --port 3030
popd