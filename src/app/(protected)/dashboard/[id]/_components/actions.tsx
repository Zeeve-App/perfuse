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
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useModalStore } from "@/store/modal";
import { Button, IconButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgTrash from "@/lib/icons/essential/outline/Trash";
import { useNetworkStore } from "@/store/network";
import { NetworkDbRow, NodeDbRow, TaskDbRow } from "@/db-queries";
import useApi from "@/api-client";
import { isSelected } from "@/constants/create-network";

/** network action component e.g: delete, explorer and monitor */
const Actions = ({
  // network,
  task,
  explorerUrl: { paraExplorerUrl, analyticsUrl, stateScanUrl },
  isSelected,
}: {
  network?: NetworkDbRow;
  task?: TaskDbRow;
  nodes?: NodeDbRow[];
  explorerUrl: {
    paraExplorerUrl: string;
    traceUrl: string;
    analyticsUrl: string;
    stateScanUrl: string;
  };
  isSelected: isSelected;
}) => {
  /** getting params from the url */
  const params = useParams();
  const networkId = params.id as string;
  const { openModal } = useModalStore();

  const apis = useApi();
  /** block number api */
  const { data: blockRpcResponse } = apis.blockNumber();
  /** network store */
  const setNetworkStore = useNetworkStore((e) => e.setNetworkInfo);
  const setTasks = useNetworkStore((e) => e.setTasks);

  const { data: network } = apis.network(networkId);
  const { data: tasks } = apis.getTasks(networkId);

  /** updating network data in store */
  useEffect(() => {
    setNetworkStore({
      data: {
        networkId,
        networkName: network?.data?.network_name ?? "NA",
        relayChainType: network?.data?.network_relay_chain_type ?? "NA",
        networkStatus: task?.task_status,
        blockHeight: parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16),
        subQueryEnabled: network?.data?.subquery_enabled || false,
        polkadotActive: network?.data?.polkadot_active || false,
        statescanActive: network?.data?.statescan_active || false,
      },
      isLoading: false,
    });
  }, [
    blockRpcResponse,
    network?.data?.network_name,
    network?.data?.network_relay_chain_type,
    network?.data?.polkadot_active,
    network?.data?.statescan_active,
    network?.data?.subquery_enabled,
    networkId,
    setNetworkStore,
    task?.task_status,
  ]);

  useEffect(() => {
    setTasks({ data: tasks?.data.pendingTasks ?? [], isLoading: false });
  }, [tasks]);

  return (
    <div className="flex flex-row gap-x-4">
      <Button
        onClick={() => {
          openModal("explorers", {
            explorers: {
              polkadotLink: paraExplorerUrl,
              stateScanLink: stateScanUrl,
              traceHawkLink: "",
              isSelected,
            },
          });
        }}
        // isDisabled={task?.task_status == "completed"}
        variant={"outline"}
        colorScheme={"accent"}
      >
        Explorer
      </Button>

      <Button
        // onClick={handleToggle}
        isDisabled={task?.task_status !== "completed"}
        variant={"outline"}
        colorScheme={"accent"}
        isFullWidth
        onClick={() => {
          window.open(analyticsUrl);
        }}
      >
        Monitoring
      </Button>
      <Tooltip text="Delete Network" placement={"top-start"}>
        <IconButton
          colorScheme="red"
          variant={"outline"}
          onClick={() => {
            openModal("deleteNetwork", {
              deleteNetwork: { networkId, networkName: network?.data?.network_name as string },
            });
          }}
        >
          {<SvgTrash className="text-xl" />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Actions;
