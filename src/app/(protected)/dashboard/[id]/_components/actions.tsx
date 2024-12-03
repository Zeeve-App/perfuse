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
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { parseJSON } from "date-fns";
import { useModalStore } from "@/store/modal";
import { Button, IconButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgTrash from "@/lib/icons/essential/outline/Trash";
import { useNetworkStore } from "@/store/network";
import { NetworkDbRow, NodeDbRow, TaskDbRow } from "@/db-queries";
import { DropdownMenu, DropdownMenuButton, DropdownMenuList, DropdownMenuItem } from "@/lib/components/DropdownMenu";
import { useToggle } from "@/hooks";
import useApi from "@/api-client";

/** network action component e.g: delete, explorer and monitor */
const Actions = ({
  network,
  task,
  explorerUrl: { paraExplorerUrl, analyticsUrl },
}: {
  network?: NetworkDbRow;
  task?: TaskDbRow;
  nodes?: NodeDbRow[];
  explorerUrl: { paraExplorerUrl: string; traceUrl: string; analyticsUrl: string };
}) => {
  /** getting params from the url */
  const params = useParams();
  const { isOpen, handleToggle, handleClose } = useToggle();
  const networkId = params.id as string;
  const { openModal } = useModalStore();

  const apis = useApi();
  /** block number api */
  const { data: blockRpcResponse } = apis.blockNumber();
  /** network store */
  const setNetworkStore = useNetworkStore((e) => e.setNetworkInfo);

  /** updating network data in store */
  useEffect(() => {
    setNetworkStore({
      data: {
        networkId,
        networkName: network?.network_name ?? "NA",
        relayChainType: network?.network_relay_chain_type ?? "NA",
        networkStatus: task?.task_status,
        blockHeight: parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16),
        parachainId: JSON.parse(network?.network_chain_spec_file_json ?? "{}").para_id,
      },
      isLoading: false,
    });
  }, [
    blockRpcResponse,
    network?.network_name,
    network?.network_relay_chain_type,
    networkId,
    setNetworkStore,
    task?.task_status,
  ]);

  return (
    <div className="flex flex-row gap-x-4">
      <Button
        onClick={() => {
          openModal("explorers", {
            explorers: {
              polkadotLink: paraExplorerUrl,
              subScanLink: "",
              traceHawkLink: "",
            },
          });
        }}
        isDisabled={task?.task_status !== "completed"}
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
      >
        <Link href={analyticsUrl} target={"_blank"}>
          Monitoring
        </Link>
      </Button>
      <Tooltip text="Delete Network" placement={"top-start"}>
        <IconButton
          colorScheme="red"
          variant={"outline"}
          onClick={() => {
            openModal("deleteNetwork", { deleteNetwork: { networkId, networkName: network?.network_name as string } });
          }}
        >
          {<SvgTrash className="text-xl" />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Actions;
