SCRIPTS_DIR = scripts

# Targets
all:  initial proxy_setup binary_install generate-genesis-wasm-spec build-relaychain build-parachain 

clean:
	sudo bash $(SCRIPTS_DIR)/clean.sh

proxy_setup:
	sudo bash $(SCRIPTS_DIR)/setup_proxy.sh

initial:
	sudo bash $(SCRIPTS_DIR)/initialization.sh

build-relaychain:
	sudo bash $(SCRIPTS_DIR)/setup_relaychain.sh 

build-parachain:
	sudo bash $(SCRIPTS_DIR)/setup_parachain.sh 

binary_install:
	sudo bash $(SCRIPTS_DIR)/binary_install.sh

generate_nodeKeys:
	sudo bash $(SCRIPTS_DIR)/generate_keys.sh

generate-genesis-wasm-spec:
	sudo bash $(SCRIPTS_DIR)/generate_json.sh

.PHONY: all initial binary_install generate-genesis-wasm-spec build-relaychain build-parachain