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
import { useEffect, useState } from "react";
import RegisterParachainInfo from "../_components/register-parachain-info";
import NodeTable from "../_components/node-table";
import { useWindowDimensions } from "@/hooks";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@/lib/components/Tabs";
import { NodeDbRow } from "@/db-queries";
import useApi from "@/api-client";

const MyNodes = ({ nodes }: { nodes: { collator: NodeDbRow[]; rpc: NodeDbRow[] } }) => {
  // set config tabs orientation
  const [configTabsOrientation, setConfigTabsOrientation] = useState<"horizontal" | "vertical">("vertical");
  const windowSize = useWindowDimensions();
  useEffect(() => {
    if (typeof windowSize.width === "number" && windowSize.width >= 1024) {
      setConfigTabsOrientation("vertical");
    } else {
      setConfigTabsOrientation("horizontal");
    }
  }, [windowSize]);

  const apis = useApi();
  const { data: blockRpcResponse } = apis.blockNumber();
  const blockHeight = parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16);

  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <RegisterParachainInfo show={blockHeight === 0} />
      <Tabs orientation={configTabsOrientation}>
        <TabList>
          <Tab className="border-transparent focus:border-transparent">Collator Nodes</Tab>
          <Tab className="border-transparent focus:border-transparent">RPC Nodes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NodeTable nodeType={"collator"} heading="Collator Nodes" nodes={nodes.collator} />
          </TabPanel>
          <TabPanel>
            <NodeTable nodeType={"rpc"} heading="RPC Nodes" nodes={nodes.rpc} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MyNodes;
