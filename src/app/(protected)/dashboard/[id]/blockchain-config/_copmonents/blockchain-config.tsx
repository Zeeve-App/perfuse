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

"use client";

import React from "react";
import RegisterParachainInfo from "../../_components/register-parachain-info";
import ParachainSpecFile from "./parachain-spec-file";
import ParachainConfig from "./parachain-config";
import Parameters from "./parameters";
import PreMiningConfig from "./pre-minting-config";
import RelayChainConfig from "./relay-chain-config";
import TokenInfo from "./token-info";
import { ChainSpecFileType } from "@/types/chain-spec";
import useApi from "@/api-client";
import { Card } from "@/lib/components/Card";

const BlockchainConfig = ({
  chainSpecJSON,
  relayChain,
}: {
  chainSpecJSON: ChainSpecFileType;
  relayChain: { type: string | undefined; version: string | undefined };
}) => {
  const isLoading = false;

  const apis = useApi();
  const { data: blockRpcResponse, isLoading: blockRpcLoading } = apis.blockNumber();
  const blockHeight = parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16);

  return (
    <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
      <RegisterParachainInfo show={blockHeight === 0} />
      <Parameters isLoading={isLoading || blockRpcLoading} data={chainSpecJSON} blockHeight={blockHeight} />
      <ParachainConfig isLoading={isLoading} data={chainSpecJSON} />
      <TokenInfo isLoading={isLoading} data={chainSpecJSON} />
      <ParachainSpecFile isLoading={isLoading} data={chainSpecJSON} />
      <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-6">
        <PreMiningConfig isLoading={isLoading} data={chainSpecJSON} />
        <RelayChainConfig
          isLoading={isLoading}
          relayChain={{
            type: relayChain.type,
            version: relayChain.version,
          }}
        />
      </Card>
    </div>
  );
};

export default BlockchainConfig;
