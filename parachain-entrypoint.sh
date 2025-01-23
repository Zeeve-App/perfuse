#!/bin/bash

PARACHAIN_DIR="${PARACHAIN_DIR:-/home/perfuse/parachain}" # Customizable parachain directory

# Load environment variables
parachain_key_dir="${PARACHAIN_KEY_DIR:-/home/perfuse/parachain_keys}"
chain_spec="$PARACHAIN_DIR/raw-parachain-chainspec.json"
extra_params="--unsafe-rpc-external --rpc-methods unsafe"
network=$NETWORK_TYPE
collator_num=$COL_NUM

if [[ $IS_COL == '1' && $collator_num == '1'  ]]; then
    NODE_NAME=$COL_NAME_1
elif  [[ $IS_COL == '1' && $collator_num == '2'  ]]; then
    NODE_NAME=$COL_NAME_2
elif [[ $IS_COL == '0'  ]]; then
    NODE_NAME=$RPC_NAME
else
 echo "Unknown node type"
fi

base_path="/home/perfuse/parachain/$NODE_NAME/data"
mkdir -p "$base_path"
chown -R "$(whoami):$(whoami)" "$base_path"

bootnode_id_1=$(/usr/local/bin/polkadot key inspect-node-key --file /home/perfuse/parachain_keys/collator_node_key_1.txt)
bootnode_id_2=$(/usr/local/bin/polkadot key inspect-node-key --file /home/perfuse/parachain_keys/collator_node_key_2.txt)

col_1_boot="/dns4/collator_1/tcp/40334/p2p/${bootnode_id_1}"
col_2_boot="/dns4/collator_2/tcp/40335/p2p/${bootnode_id_2}"

exec_start="/usr/local/bin/polkadot-parachain \
  --name $NODE_NAME \
  --chain $chain_spec \
  --base-path $base_path \
  --prometheus-external \
  --rpc-cors all \
  --prometheus-port $PROMETHEUS_PORT \
  --port $PORT \
  --rpc-port $RPC_PORT \
  $extra_params"

if [[ $IS_COL == '1' ]]; then
  exec_start+=" \
    --collator \
    --node-key-file $parachain_key_dir/collator_node_key_$collator_num.txt \
    --bootnodes $col_1_boot $col_2_boot \
    -- \
    --chain $network \
    --sync warp \
    --port $((PORT + 2022)) \
    --rpc-port $((RPC_PORT + 2022))"
else
    exec_start+=" \
      --rpc-max-connections 50000 \
      --state-pruning archive \
      -- \
      --chain $network \
      --sync warp \
      --state-pruning 1000 \
      --port $((PORT + 2022)) \
      --rpc-port $((RPC_PORT + 2022)) "
fi

echo "Starting $NODE_NAME with command: $exec_start"
$exec_start
