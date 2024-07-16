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
import { useModalStore } from "@/store/modal";
import { Button, IconButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgTrash from "@/lib/icons/essential/outline/Trash";
import { useNetworkStore } from "@/store/network";
import { NetworkDbRow, TaskDbRow } from "@/db-queries";
import { DropdownMenu, DropdownMenuButton, DropdownMenuList, DropdownMenuItem } from "@/lib/components/DropdownMenu";
import { useToggle } from "@/hooks";
import useApi from "@/api-client";

const Actions = ({
  network,
  task,
  explorerUrl: { paraExplorerUrl, relayExplorerUrl },
}: {
  network: NetworkDbRow;
  task?: TaskDbRow;
  explorerUrl: { paraExplorerUrl: string; relayExplorerUrl: string };
}) => {
  const params = useParams();
  const { isOpen, handleToggle, handleClose } = useToggle();
  const networkId = params.id as string;
  const { openModal } = useModalStore();

  const apis = useApi();
  const { data: blockRpcResponse } = apis.blockNumber();
  const setNetorkInStore = useNetworkStore((e) => e.setNetworkInfo);

  useEffect(() => {
    setNetorkInStore({
      data: {
        networkId,
        networkName: network.network_name,
        relayChainType: network.network_relay_chain_type,
        networkStatus: task?.task_status,
        blockHeight: parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16),
      },
      isLoading: false,
    });
  }, [
    blockRpcResponse,
    network.network_name,
    network.network_relay_chain_type,
    networkId,
    setNetorkInStore,
    task?.task_status,
  ]);

  return (
    <div className="flex flex-row gap-x-4">
      <DropdownMenu onClose={handleClose} isOpen={isOpen} placement="bottom-start">
        <DropdownMenuButton
          as={Button}
          onClick={handleToggle}
          isDisabled={task?.task_status !== "completed"}
          variant={"outline"}
          isFullWidth
        >
          Explorer
        </DropdownMenuButton>
        <DropdownMenuList>
          <Link href={relayExplorerUrl} target={"_blank"}>
            <DropdownMenuItem>Relay Chain Explorer</DropdownMenuItem>
          </Link>
          <Link href={paraExplorerUrl} target={"_blank"}>
            <DropdownMenuItem>Parachain Explorer</DropdownMenuItem>
          </Link>
        </DropdownMenuList>
      </DropdownMenu>
      <Tooltip text="Delete Network" placement={"top-start"}>
        <IconButton
          colorScheme="red"
          variant={"outline"}
          onClick={() => {
            openModal("deleteNetwork", { deleteNetwork: { networkId, networkName: network.network_name as string } });
          }}
        >
          {<SvgTrash className="text-xl" />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Actions;
