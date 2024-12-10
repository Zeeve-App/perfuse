# SPDX-License-Identifier: AGPL-3.0-or-later

# Copyright (C) 2024 [Perfuse]
#
# This program is free software: you can redistribute it and/or modify 
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

SCRIPTS_DIR = scripts

# Targets
all:  initial polkadotjs_app proxy_setup binary_install generate-genesis-wasm-spec build-parachain monitoring statescan

clean:
	sudo bash $(SCRIPTS_DIR)/clean.sh

proxy_setup:
	sudo bash $(SCRIPTS_DIR)/setup_proxy.sh

initial:
	sudo bash $(SCRIPTS_DIR)/initialization.sh

build-parachain:
	sudo bash $(SCRIPTS_DIR)/setup_parachain.sh 

binary_install:
	sudo bash $(SCRIPTS_DIR)/binary_install.sh

generate_nodeKeys:
	sudo bash $(SCRIPTS_DIR)/generate_keys.sh

generate-genesis-wasm-spec:
	sudo bash $(SCRIPTS_DIR)/generate_json.sh

polkadotjs_app:
	sudo bash $(SCRIPTS_DIR)/local_jsapps.sh

monitoring:
	sudo bash $(SCRIPTS_DIR)/setup_monitoring.sh

statescan:
	sudo bash $(SCRIPTS_DIR)/statescan.sh

.PHONY: all initial polkadotjs_app proxy_setup binary_install generate-genesis-wasm-spec build-parachain monitoring statescan
