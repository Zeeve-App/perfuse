export const sideCardOptions = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export type networkEnvType = "devnet" | "mainnet" | "testnet";

export const relayChainOption: Record<networkEnvType, { label: string; value: string }[]> = {
  devnet: [{ label: "Rococo-local", value: "rococo_local" }],
  mainnet: [
    { label: "Kusama", value: "kusama" },
    { label: "Polkadot", value: "polkadot" },
  ],
  testnet: [{ label: "Rococo", value: "rococo" }],
};

export const templateOption = [
  { label: "Substrate", value: "substrate" },
  { label: "Evm Frontier", value: "evm_frontier" },
  { label: "Custom", value: "custom" },
  { label: "OpenZeppelin", value: "openzeppelin", isDisabled: true },
  { label: "Pop CLI", value: "custom", isDisabled: true },
];

export const networkEnvOption: { label: string; value: networkEnvType; isDisabled?: boolean }[] = [
  { label: "Devnet", value: "devnet" },
  { label: "Mainnet", value: "mainnet", isDisabled: true },
  { label: "Testnet", value: "testnet", isDisabled: true },
];

export const explorerOption = [
  { label: "Polkadot.js", value: "polkadotjs" },
  { label: "RegionX", value: "regionx" },
  // { label: "Polcascan", value: "polkascan" },
  // { label: "Subscann", value: "subscan" },
  // { label: "TraceHawk", value: "tracehawk" },
];

export type AuthenticationMethods = "api_key" | "basic_auth";

export const authenticationMethods: {
  name: string;
  value: AuthenticationMethods;
  tooltipText?: string;
  isDisabled?: boolean;
}[] = [
  {
    tooltipText: "Secret key ID gets included in the public endpoint.",
    name: "API KEY",
    value: "api_key",
  },
  {
    tooltipText: "Coming soon.",
    name: "Basic Auth",
    value: "basic_auth",
    isDisabled: true,
  },
];
