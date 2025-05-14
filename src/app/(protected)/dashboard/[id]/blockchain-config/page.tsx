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

import React from "react";
import { Metadata } from "next";
import BlockchainConfig from "./_copmonents";
import { getNetworkData } from "@/db-queries";
import { ChainSpecFileType } from "@/types/chain-spec";

/** blockchain config page metadata */
export const metadata: Metadata = {
  title: "Perfuse | Parachain Details",
  description: "blockchain config of parachain network",
};

/** block chain config page main component */
const BlockchainConfigPage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const network = await getNetworkData(params.id);
  const chainSpecJSON: ChainSpecFileType = JSON.parse(network?.network_chain_spec_file_json ?? "");
  chainSpecJSON.genesis.runtimeGenesis.code = "<Download file to see full content>";
  return (
    <BlockchainConfig
      chainSpecJSON={chainSpecJSON}
      relayChain={{
        type: network?.network_relay_chain_type,
        version: network?.network_relay_chain_version,
      }}
    />
  );
};

export default BlockchainConfigPage;
export const dynamic = "force-dynamic";
