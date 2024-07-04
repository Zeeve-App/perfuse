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

export const templateOption: { label: string; value: string; isDisabled: boolean }[] = [
  {
    label: "Substrate",
    value: "substrate",
    isDisabled: false,
  },
  {
    label: "Evm Frontier",
    value: "evm_frontier",
    isDisabled: false,
  },
  { label: "Contracts", value: "contracts", isDisabled: true },
  { label: "Assets", value: "assets", isDisabled: true },
  {
    label: "Custom",
    value: "custom",
    isDisabled: false,
  },
];

export const networkEnvOption: { label: string; value: networkEnvType; isDisabled?: boolean }[] = [
  { label: "Devnet", value: "devnet" },
  { label: "Testnet", value: "testnet", isDisabled: true },
  { label: "Mainnet", value: "mainnet", isDisabled: true },
];

export const explorerOption = [
  { label: "Polkadot.js", value: "polkadotjs", isDisabled: false },
  // { label: "RegionX", value: "regionx" },
  // { label: "Polcascan", value: "polkascan" },
  { label: "Subscan", value: "subscan", isDisabled: true },
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
