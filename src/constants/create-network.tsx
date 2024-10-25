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

export const envAndRelayChainOption = [
  {
    environment: {
      label: "Testnet",
      value: "testnet",
    },
    relayChainOption: [
      {
        label: "Paseo",
        value: "paseo",
        isDisabled: true,
      },
      {
        label: "Local",
        value: "local",
      },
    ],
  },
  {
    environment: {
      label: "Mainnet",
      value: "mainnet",
      isDisabled: true,
    },
    relayChainOption: [
      {
        isDisabled: true,
        label: "Kusama",
        value: "kusama",
      },
      {
        isDisabled: true,
        label: "Polkadot",
        value: "polkadot",
      },
    ],
  },
];

export const templateOption: { label: string; value: string; isDisabled: boolean; icon?: JSX.Element }[] = [
  {
    label: "Substrate",
    value: "substrate",
    isDisabled: false,
    icon: <SvgSubstrate />,
  },
  {
    label: "Evm",
    value: "evm_frontier",
    isDisabled: false,
    icon: (
      <div className="flex size-10 items-center  justify-center rounded-full border border-brand-gray/45 bg-white p-2">
        <Image height={15} width={15} alt={"eth"} src={withBasePath("/assets/images/create/eth.png")}></Image>
      </div>
    ),
  },
  // { label: "Contracts", value: "contracts", isDisabled: true, icon: <SvgSubstrate /> },
  // { label: "Assets", value: "assets", isDisabled: true, icon: <SvgSubstrate /> },
  {
    label: "Custom",
    value: "custom",
    isDisabled: false,
    icon: (
      <div className="flex items-center  justify-center rounded-full">
        <SvgCreateConfig className="size-10" />
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
  icon?: JSX.Element;
}[] = [
  {
    label: "Polkadot.js",
    value: "polkadotjs",
    isDisabled: false,
    icon: (
      <div className="flex size-10  items-center justify-center rounded-full border border-brand-gray/45 p-2">
        <Image height={15} width={15} alt={"eth"} src={withBasePath("/assets/images/create/polkadot.png")}></Image>
      </div>
    ),
  },
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
