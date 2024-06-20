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

const Actions = ({ network, task, explorerUrl }: { network: NetworkDbRow; task?: TaskDbRow; explorerUrl: string }) => {
  const params = useParams();
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
      <Tooltip text="Delete Network" placement={"top-start"}>
        <Link href={explorerUrl}>
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
