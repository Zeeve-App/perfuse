import { NodeNetworkStates } from "./node";

/** type declaration of purpose of environment of parachain network */
type NetworkEnvironment = "sandbox" | "production";

/** type declaration of parachain network */
type Network = {
  networkId: string;
  networkName: string;
  networkEnvironment: string;
  // networkStatus: NodeNetworkStates;
  networkCreatedAt: Date;
};

export type { NetworkEnvironment, Network };
