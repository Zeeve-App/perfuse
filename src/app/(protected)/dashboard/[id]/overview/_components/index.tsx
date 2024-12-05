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
import GeneralInfo from "./general-info";
import Nodes from "./nodes";
import BlockchainConfig from "./blockchain-config";
import { NodeDbRow } from "@/db-queries";
import useApi from "@/api-client";

/** overview component props */
interface OverviewProps {
  isLoading: boolean;
  createdAt: string;
  provisionedAt?: string;
  env: string;
  name: string;
  id: string;
  paraId: string;
  relayCainType: string;
  nodes: (NodeDbRow & { health: boolean })[];
  ownedBy: string;
}

/** overview Component main component */
const Overview = ({
  createdAt,
  env,
  id,
  isLoading,
  name,
  nodes,
  paraId,
  relayCainType,
  provisionedAt,
  ownedBy,
}: OverviewProps) => {
  const apis = useApi();
  const { data: blockRpcResponse } = apis.blockNumber();
  return (
    <div className="grid grid-cols-10 gap-3 text-brand-dark">
      <RegisterParachainInfo show={parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16) === 0} />
      <GeneralInfo
        isLoading={isLoading}
        createdAt={createdAt}
        env={env}
        name={name}
        id={id}
        provisionedAt={provisionedAt}
        ownedBy={ownedBy}
      />
      <BlockchainConfig isLoading={isLoading} paraId={paraId} relayChainType={relayCainType} />
      <Nodes isLoading={isLoading} nodes={nodes} />
    </div>
  );
};

export default Overview;
