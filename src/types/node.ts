type NodeNetworkStates = "requested" | "provisioning" | "ready" | "deleting" | "deleted" | "failed" | "updating";
type NODE_TYPE = "rpc" | "collator";
type CREDENTIALS_TYPE = "basic_auth" | "api_key";
type Node = {
  nodeId: string;
  nodeName: string;
  nodeType: NODE_TYPE;
  nodeRegion: string;
  nodeStatus: NodeNetworkStates;
  nodeCreatedAt: Date;
};

export type { NodeNetworkStates, NODE_TYPE, Node, CREDENTIALS_TYPE };
