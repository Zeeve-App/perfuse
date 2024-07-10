import Image from "next/image";
import SvgCreateConfig from "@/lib/icons/custom/create-config";
import { withBasePath } from "@/utils/helpers";
import SvgSubstrate from "@/lib/icons/custom/substrate";

export const sideCardOptions = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export type networkEnvType = "devnet" | "mainnet" | "testnet";

export const relayChainOption: Record<networkEnvType, { label: string; value: string; icon?: JSX.Element }[]> = {
  devnet: [{ label: "Rococo-local", value: "rococo_local", icon: <SvgSubstrate /> }],
  mainnet: [
    { label: "Kusama", value: "kusama" },
    { label: "Polkadot", value: "polkadot" },
  ],
  testnet: [{ label: "Rococo", value: "rococo" }],
};

export const templateOption: { label: string; value: string; isDisabled: boolean; icon?: JSX.Element }[] = [
  {
    label: "Substrate",
    value: "substrate",
    isDisabled: false,
    icon: <SvgSubstrate />,
  },
  {
    label: "Evm Frontier",
    value: "evm_frontier",
    isDisabled: false,
    icon: (
      <div className="flex size-10  items-center justify-center rounded-full border border-brand-gray/45 p-2">
        <Image height={15} width={15} alt={"eth"} src={withBasePath("/assets/images/create/eth.png")}></Image>
      </div>
    ),
  },
  { label: "Contracts", value: "contracts", isDisabled: true, icon: <SvgSubstrate /> },
  { label: "Assets", value: "assets", isDisabled: true, icon: <SvgSubstrate /> },
  {
    label: "Custom",
    value: "custom",
    isDisabled: false,
    icon: (
      <div className="rounded-full border border-brand-gray/45 p-2">
        <SvgCreateConfig height={24} width={24} />
      </div>
    ),
  },
];

export const networkEnvOption: { label: string; value: networkEnvType; isDisabled?: boolean; tooltipText?: string }[] =
  [
    { label: "Devnet", value: "devnet", tooltipText: "this is devnet" },
    { label: "Testnet", value: "testnet", isDisabled: true, tooltipText: "this is devnet" },
    { label: "Mainnet", value: "mainnet", isDisabled: true, tooltipText: "this is devnet" },
  ];

export const explorerOption: {
  label: string;
  value: string;
  isDisabled: boolean;
  tooltipText?: string;
}[] = [
  { label: "Polkadot.js", value: "polkadotjs", isDisabled: false },
  { label: "Subscan", value: "subscan", isDisabled: true },
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
