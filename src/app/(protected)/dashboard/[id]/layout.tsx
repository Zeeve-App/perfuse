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
import { getNetworkData, getNodes, getTask } from "@/db-queries";
import { config } from "@/config/config";
import { Badge } from "@/lib/components/Badge/Badge";

/** dashboard layout component */
const DashboardLayout: React.FC<{ children: React.ReactNode; params: { id: string } }> = async ({
  children,
  params,
}) => {
  const id = params.id;
  const headersList = headers();

  const host = headersList.get("host");
  const explorer = config.client.explorer || "https://polkadot.js.org/apps/";
  const network = await getNetworkData(id);
  const nodes = await getNodes(id);
  /** rpc node details */
  const rpcNode = nodes.filter((e) => e.node_type === "rpc")?.[0];

  /** creating rpc url for explorer */
  let rpcWsUrl = "";
  let rpcHttpUrl = "";
  if (rpcNode?.node_auth_method === "api_key") {
    rpcWsUrl = `ws://${host?.split(":")[0]}/${rpcNode.node_api_key}`;
    rpcHttpUrl = `http://${host?.split(":")[0]}/${rpcNode.node_api_key}`;
  } else {
    rpcWsUrl = `ws://${rpcNode?.node_username}:${rpcNode?.node_password}@${host?.split(":")[0]}`;
    rpcHttpUrl = `http://${rpcNode?.node_username}:${rpcNode?.node_password}@${host?.split(":")[0]}`;
  }

  /** explorer urls */
  const paraExplorerUrl = `${rpcHttpUrl}/polkadotjs/?rpc=${encodeURIComponent(`${rpcWsUrl}/para-rpc`)}#explorer`;
  const stateScanUrl = `${rpcHttpUrl}/statescan/`;
  const traceUrl = `${`${rpcHttpUrl}/polkadotjs`}`;
  const analyticsUrl = `${`${rpcHttpUrl}/grafana`}`;

  const task = await getTask({ task_associated_network_id: network?.network_id, task_type: "network_provision" });

  return (
    <div className="flex flex-col gap-3 px-3 lg:px-6">
      <Navigation
        heading={
          <>
            <span className="capitalize">{network?.network_name} </span>
            <Badge variant="purple" className="text-base font-normal capitalize">
              {network?.network_env}
            </Badge>
          </>
        }
      >
        {/* page actions */}
        <Actions
          network={network}
          task={task}
          explorerUrl={{ paraExplorerUrl, traceUrl, analyticsUrl, stateScanUrl }}
        />
      </Navigation>
      <TabContainer
        id={params.id}
        collatorNodesCount={nodes.filter((e) => e.node_type === "collator").length}
        rpcNodesCount={nodes.filter((e) => e.node_type === "rpc").length}
      />
      <div className="mb-4 gap-4 overflow-x-auto border-0">{children}</div>
    </div>
  );
};

export default DashboardLayout;
