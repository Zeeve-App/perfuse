SCRIPTS_DIR = scripts

# Targets
all: build-relaychain build-parachain generate-genesis-wasm-spec

build-relaychain:
	sudo bash $(SCRIPTS_DIR)/setup_relaychain.sh build-relaychain 

build-parachain:
	sudo bash $(SCRIPTS_DIR)/setup_parachain.sh build-parachain 

# binary_install:
# 	./binary_and_keys.sh binary_install

generate-genesis-wasm-spec:
	sudo bash $(SCRIPTS_DIR)/generate_json.sh generate-genesis-wasm-spec

.PHONY: all build-relaychain build-parachain generate-genesis-wasm-spec