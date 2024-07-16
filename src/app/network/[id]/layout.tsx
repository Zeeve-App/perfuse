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

import { headers } from "next/headers";
import Actions from "./_components/actions";
import TabContainer from "./_components/tabs-container";
import { Navigation } from "@/lib/components/navigation";
import { getNetworkData, getNodeData, getTask } from "@/db-queries";
import { config } from "@/config/config";

const IdPageClient: React.FC<{ children: React.ReactNode; params: { id: string } }> = async ({ children, params }) => {
  const id = params.id;
  const headersList = headers();

  const host = headersList.get("host");
  const explorer = config.client.explorer || "https://polkadot.js.org/apps/";
  const network = await getNetworkData(id);
  const rpcNode = await getNodeData({ network_id: id, node_type: "rpc" });
  let rpcUrl = "";
  if (rpcNode?.node_auth_method === "api_key") {
    rpcUrl = `ws://${host?.split(":")[0]}/${rpcNode.node_api_key}`;
  } else {
    rpcUrl = `ws://${rpcNode?.node_username}:${rpcNode?.node_password}@${host?.split(":")[0]}`;
  }

  const paraExplorerUrl = `${explorer}/?rpc=${encodeURIComponent(`${rpcUrl}/para-rpc`)}#explorer`;
  const relayExplorerUrl = `${explorer}/?rpc=${encodeURIComponent(`${rpcUrl}/relay-rpc`)}#explorer`;
  if (!network) {
    return "network not found";
  }

  const task = await getTask({ task_associated_network_id: network?.network_id, task_type: "network_provision" });

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="rounded-lg border border-brand-outline bg-white px-3 pb-3 pt-6 lg:px-6 lg:pb-6">
        <Navigation heading={"Parachains"}>
          {/* page actions */}
          <Actions network={network} task={task} explorerUrl={{ paraExplorerUrl, relayExplorerUrl }} />
        </Navigation>
        <TabContainer id={params.id} />
        <div className="mb-4 gap-4 overflow-x-auto border-0">{children}</div>
      </div>
    </div>
  );
};

export default IdPageClient;
