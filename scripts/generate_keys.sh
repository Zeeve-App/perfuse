
# Key generation variables
relaychain_key_dir="${RELAYCHAIN_KEY_DIR:-/home/perfuse/relaychain_keys}"
parachain_key_dir="${PARACHAIN_KEY_DIR:-/home/perfuse/parachain_keys}"
relaychain_key_count=2
parachain_key_count=2

# Function to generate node keys for relaychain or parachain
generate_node_keys() {
    local node_name="$1"
    local key_dir="$2"
    local key_count="$3"

    mkdir -p "$key_dir"
    for i in $(seq 1 $key_count); do
        key_file="$key_dir/${node_name}_node_key_$i.txt"
        echo "Generating $node_name node key and saving to: $key_file"
        if [ "$node_name" = "relaychain" ]; then
            $PARACHAIN_DIR/polkadot key generate-node-key --file "$key_file"
        else
            $PARACHAIN_DIR/polkadot-parachain key generate-node-key --file "$key_file"
        fi
    done
}