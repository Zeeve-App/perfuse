"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "@/store/modal";
// import useAnalyticsService from "@/services/analytics/use-analytics-service";
import { Button, IconButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgTrash from "@/lib/icons/essential/outline/Trash";
import { useNetworkStore } from "@/store/network";
import { NetworkDbRow, TaskDbRow } from "@/db-queries";
import { DropdownMenu, DropdownMenuButton, DropdownMenuList, DropdownMenuItem } from "@/lib/components/DropdownMenu";
import { useToggle } from "@/hooks";
import SvgChart5Square from "@/lib/icons/business/outline/Chart5Square";

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
  const setNetorkInStore = useNetworkStore((e) => e.setNetworkInfo);
  setNetorkInStore({
    data: {
      networkId,
      networkName: network.network_name,
      relayChainType: network.network_relay_chain,
      networkStatus: task?.task_status,
    },
    isLoading: false,
  });

  return (
    <div className="flex flex-row gap-x-4">
      <DropdownMenu onClose={handleClose} isOpen={isOpen} placement="bottom-start">
        <DropdownMenuButton
          as={Button}
          onClick={handleToggle}
          // isDisabled={task?.task_status !== "completed"}
          iconLeft={<SvgChart5Square className="text-xl" />}
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
        <Link href={"#"}>
          <Button colorScheme="blue" variant={"solid"}>
            Explorer
          </Button>
        </Link>
      </Tooltip>
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
