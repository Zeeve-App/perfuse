"use client";
import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal";
// import useAnalyticsService from "@/services/analytics/use-analytics-service";
import { IconButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgTrash from "@/lib/icons/essential/outline/Trash";

const Actions = () => {
  const params = useParams();
  const networkId = params.id as string;
  const { openModal } = useModalStore();
  const networkInfo = {};

  return (
    <div className="flex flex-row gap-x-4">
      <Tooltip text="Delete Network" placement={"top-start"}>
        <IconButton
          colorScheme="red"
          variant={"outline"}
          onClick={() => {
            //TODO: change name
            openModal("deleteNetwork", { deleteNetwork: { networkId, networkName: "name" as string } });
          }}
        >
          {<SvgTrash className="text-xl" />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Actions;
