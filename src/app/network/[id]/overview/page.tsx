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
import Overview from "./overview";
import { getNetworkData, getNodes, getTask } from "@/db-queries";
import { ChainSpecFileType } from "@/types/chain-spec";

export const metadata: Metadata = {
  title: "Perfuse | Parachain Details",
  description: "Overview of parachain node",
};

const CreatePage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const network = await getNetworkData(params.id);
  const nodes = await getNodes(params.id);
  const task = await getTask({ task_associated_network_id: network?.network_id, task_type: "network_provision" });
  const chainSpec: ChainSpecFileType = JSON.parse(network?.network_chain_spec_file_json ?? "");
  if (!network) {
    return <>Error while loading network. Invalid network Id</>;
  }
  // console.log(task);

  return (
    <Overview
      isLoading={false}
      createdAt={network.created_at}
      env={network.network_env}
      name={network.network_name}
      id={network.network_id}
      paraId={chainSpec.para_id.toString()}
      relayCainType={network.network_relay_chain_type}
      nodes={nodes}
      provisionedAt={task?.task_updated_at}
    />
  );
};

export default CreatePage;
