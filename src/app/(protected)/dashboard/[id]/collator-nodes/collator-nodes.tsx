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
import RegisterParachainInfo from "../_components/register-parachain-info";
import NodeTable from "../_components/node-table";
import NodeListCard from "../_components/node-list-card";
import { NodeDbRow } from "@/db-queries";
import useApi from "@/api-client";

const CollatorNodes = ({ nodes }: { nodes: { collator: NodeDbRow[] } }) => {
  const apis = useApi();
  const { data: blockRpcResponse } = apis.blockNumber();
  const blockHeight = parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16);

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <RegisterParachainInfo show={blockHeight === 0} />
      <div className="hidden lg:block">
        <NodeTable nodeType={"collator"} heading="Collator Nodes" nodes={nodes.collator} />
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:hidden">
        {nodes.collator.map((node, index) => (
          <NodeListCard key={index} node={node} />
        ))}
      </div>
    </div>
  );
};

export default CollatorNodes;
