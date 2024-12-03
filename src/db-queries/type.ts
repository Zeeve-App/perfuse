/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

interface NetworkDbRow {
  /** Network ID */
  network_id: string;
  /** Network name */
  network_name: string;
  /** Network environment */
  network_env: string;
  /** Network template to create parachain */
  network_template: string;
  /** Network relay chain type in which parachain will be deployed */
  network_relay_chain_type: string;
  /** Relay chain version */
  network_relay_chain_version: string;
  /** If sidecar is enabled or not, 0 is disabled */
  network_sidecar: 0 | 1;
  /** Explorer type used for this network */
  network_blockchain_explorer_type: string;
  /** Network chain spec JSON data as a string */
  network_chain_spec_file_json: string;
  /** Network binary path in local storage */
  network_binary_path: string;
  /** Coretime type for the network */
  network_coretime_type: "regionx";
  /** Network user wallet address */
  network_user_address: string;
  /** Created at timestamp in ISO format */
  created_at: string;
}

interface NodeDbRow {
  /** Node ID */
  node_id: string;
  /** Associated network ID */
  network_id: string;
  /** Node type */
  node_type: "collator" | "rpc";
  /** Node name */
  node_name: string;
  /** Collator node address */
  node_address?: string;
  /** Collator node balance */
  node_balance?: number;
  /** Collator node CORS */
  node_rpc_cors?: string;
  /** RPC node endpoint */
  node_endpoint?: string;
  /** WSS enabled, 0 is disabled */
  node_wss_enabled?: 0 | 1;
  /** HTTP enabled, 0 is disabled */
  node_https_enabled?: 0 | 1;
  /** Authentication method for RPC */
  node_auth_method?: "api_key" | "basic_auth";
  /** RPC node username in case of basic auth */
  node_username?: string;
  /** RPC node password in case of basic auth */
  node_password?: string;
  /** RPC node API key */
  node_api_key?: string;
  /** collator session address */
  node_collator_session_address?: string;
  /** collator session seed added */
  node_collator_seed_added?: 0 | 1;
  /** Created at timestamp in ISO format */
  created_at: string;
}

interface TaskDbRow {
  /** Task ID */
  task_id: string;
  /** Task type */
  task_type: "network_provision" | "add_node" | "node_provision" | "delete_node" | "delete_infra";
  /** Task execution state */
  task_status: "pending" | "inprogress" | "completed" | "failed";
  /** Task associated network ID */
  task_associated_network_id: string;
  /** Task associated node ID */
  task_associated_node_id?: string;
  /** Parent task ID */
  task_parent_id?: string;
  /** Task description */
  task_description: string;
  /** Task retry count */
  task_retry_count: number;
  /** Task created at timestamp in ISO format */
  task_created_at: string;
  /** Task updated at timestamp in ISO format */
  task_updated_at: string;
}

export type { NodeDbRow, NetworkDbRow, TaskDbRow };
