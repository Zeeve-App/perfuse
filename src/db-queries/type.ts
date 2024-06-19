interface NetworkDbRow {
  network_id: string;
  network_name: string;
  network_env: string;
  network_template: string;
  network_relay_chain: string;
  network_relay_chain_version: string;
  network_sidecar: 0 | 1;
  network_blockchain_explorer: string;
  network_chain_spec_file_json: string;
  network_binary_path: string;
  created_at: string;
}

interface NodeDbRow {
  node_id: string;
  network_id: string;
  node_type: "collator" | "rpc";
  node_name: string;
  node_address?: string;
  node_balance?: number;
  node_rpc_cors?: string;
  node_endpoint?: string;
  node_wss_enabled?: 0 | 1;
  node_https_enabled?: 0 | 1;
  node_auth_method?: "api_key" | "basic_auth";
  node_username?: string;
  node_password?: string;
  node_api_key?: string;
  created_at?: Date;
}

interface TaskDbRow {
  task_id: string;
  task_type: "network_provision" | "add_node" | "node_provision" | "delete_node" | "delete_infra";
  task_status: "pending" | "inprogress" | "completed" | "failed";
  task_associated_network_id: string;
  task_associated_node_id?: string;
  task_parent_id?: string;
  task_description?: string;
  task_retry_count: number;
  task_created_at: string;
  task_updated_at: string;
}

export type { NodeDbRow, NetworkDbRow, TaskDbRow };
