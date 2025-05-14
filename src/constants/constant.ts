import { envAndRelayChainOption } from "./create-network";

export const relayChainRpc: Record<
  (typeof envAndRelayChainOption)[number]["relayChainOption"][number]["value"],
  string
> = {
  paseo: "wss://paseo.rpc.amforc.com:443", // Placeholder RPC endpoint for the 'paseo' chain
  kusama: "wss://kusama-rpc.polkadot.io", // RPC endpoint for Kusama mainnet
  polkadot: "wss://rpc.polkadot.io", // RPC endpoint for Polkadot mainnet
};
