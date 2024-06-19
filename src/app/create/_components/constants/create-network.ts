export const sideCardOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
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
];

export const networkEnvOption: { label: string; value: networkEnvType }[] = [
  { label: "Devnet", value: "devnet" },
  { label: "Mainnet", value: "mainnet" },
  { label: "Testnet", value: "testnet" },
];

export const explorerOption = [
  { label: "Polkadot.js", value: "polkadotjs" },
  { label: "Polcascan", value: "polkascan" },
  { label: "Subscann", value: "subscan" },
  { label: "TraceHawk", value: "tracehawk" },
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
    name: "API Key",
    value: "api_key",
  },
  {
    tooltipText: "Coming soon.",
    name: "Basic",
    value: "basic_auth",
    isDisabled: false,
  },
];
