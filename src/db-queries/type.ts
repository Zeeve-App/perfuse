interface NetworkDbRow {
  // network id
  network_id: string;
  // network name
  network_name: string;
  // network env
  network_env: string;
  // network template to create parachain
  network_template: string;
  // network relay chain type in which parachain will be deployed
  network_relay_chain_type: string;
  // relay chain version
  network_relay_chain_version: string;
  // if sidecar enabled or not, 0 disabled
  network_sidecar: 0 | 1;
  // explorer which is used for this network
  network_blockchain_explorer_type: string;
  // network chain spec json data as stirng
  network_chain_spec_file_json: string;
  // netowrk binary path in local storage
  network_binary_path: string;
  // created at time stamp in iso format
  created_at: string;
}

interface NodeDbRow {
  // node id
  node_id: string;
  // associated network id
  network_id: string;
  // node type
  node_type: "collator" | "rpc";
  // node name
  node_name: string;
  // collator node address
  node_address?: string;
  // collator node balance;
  node_balance?: number;
  // collator node cors
  node_rpc_cors?: string;
  // rpcnode endpoint
  node_endpoint?: string;
  // wss enabled, 0 disabled
  node_wss_enabled?: 0 | 1;
  // http enabled, 0 disabled
  node_https_enabled?: 0 | 1;
  // authentication method for rpc
  node_auth_method?: "api_key" | "basic_auth";
  // rpc node user name in case of basic auth
  node_username?: string;
  // rpc node password in case of basic auth
  node_password?: string;
  // rpc node user name in case of api key
  node_api_key?: string;
  // created at timestamp in ISO format
  created_at: string;
}

interface TaskDbRow {
  // task id
  task_id: string;
  // task type
  task_type: "network_provision" | "add_node" | "node_provision" | "delete_node" | "delete_infra";
  // task execution state
  task_status: "pending" | "inprogress" | "completed" | "failed";
  // task associated network id
  task_associated_network_id: string;
  // task associated node id
  task_associated_node_id?: string;
  // task parent task, task id
  task_parent_id?: string;
  // task description
  task_description: string;
  // task retry count
  task_retry_count: number;
  // task created at timestamp in ISO
  task_created_at: string;
  // task updated at timestamp in ISO
  task_updated_at: string;
}

export type { NodeDbRow, NetworkDbRow, TaskDbRow };
