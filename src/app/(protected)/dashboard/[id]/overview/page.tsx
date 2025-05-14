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
import Overview from "./_components";
import { getNetworkData, getNodesWithStatus, getTask } from "@/db-queries";
import { ChainSpecFileType } from "@/types/chain-spec";
import { config } from "@/config/config";

/** overview page metadata */
export const metadata: Metadata = {
  title: "Perfuse | Parachain Details",
  description: "Overview of parachain node",
};

/** overview main page component */
const OverviewPage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const network = await getNetworkData(params.id);
  const nodes = await getNodesWithStatus(params.id);

  const task = await getTask({ task_associated_network_id: network?.network_id, task_type: "network_provision" });
  const chainSpec: ChainSpecFileType = JSON.parse(network?.network_chain_spec_file_json ?? "{}");
  return (
    <Overview
      isLoading={false}
      createdAt={network?.created_at ?? new Date().toISOString()}
      env={network?.network_env ?? "NA"}
      name={network?.network_name ?? "NA"}
      id={network?.network_id ?? "NA"}
      paraId={chainSpec?.para_id?.toString()}
      relayCainType={network?.network_relay_chain_type ?? "NA"}
      nodes={nodes}
      provisionedAt={task?.task_updated_at}
      ownedBy={config.server.defaultEmail}
    />
  );
};

export default OverviewPage;
