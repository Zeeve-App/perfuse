"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "@/store/modal";
// import useAnalyticsService from "@/services/analytics/use-analytics-service";
import { useToggle } from "@/hooks";
import { Button, IconButton } from "@/lib/components/Button";
import { DropdownMenu, DropdownMenuButton, DropdownMenuList, DropdownMenuItem } from "@/lib/components/DropdownMenu";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgChart5Square from "@/lib/icons/business/outline/Chart5Square";

const Actions = () => {
  const { isOpen, handleToggle, handleClose } = useToggle();
  const params = useParams();
  const networkId = params.id as string;
  const { openModal } = useModalStore();
  const networkInfo = {};

  return (
    <div className="flex flex-row gap-x-4">
      {/* <Link href={networkInfo.data?.blockExplorerUrl} target={"_blank"}>
        <Button
          iconLeft={<IconBoxSquare className="text-xl" />}
          isLoading={networkInfo.isLoading}
          isDisabled={networkInfo.data?.status !== "ready" || !networkInfo.data?.blockExplorerUrl}
          // onClick={() => {
          //   if (networkInfo.data?.blockExplorerUrl && networkInfo.data.status === "ready") {
          //     window.open(networkInfo.data?.blockExplorerUrl);
          //   }
          // }}
        >
          Explorer
        </Button>
      </Link> */}
      <DropdownMenu onClose={handleClose} isOpen={isOpen} placement="bottom-start">
        <DropdownMenuButton
          as={Button}
          onClick={handleToggle}
          // isDisabled={networkInfo.data?.status !== "ready" || typeof data === "undefined" || data.length === 0}
          iconLeft={<SvgChart5Square className="text-xl" />}
          // isLoading={isLoading || networkInfo.isLoading}
          isFullWidth
        >
          Analytics
        </DropdownMenuButton>
        {/* <DropdownMenuList>
          {data &&
            data.map((dashboard, index) => (
              <Link key={index} href={dashboard.dashboardURL} target={"_blank"}>
                <DropdownMenuItem>{dashboard.dashboardName}</DropdownMenuItem>
              </Link>
            ))}
        </DropdownMenuList> */}
      </DropdownMenu>
      {/* <Tooltip text="Delete Network" placement={"top-start"}>
        <IconButton
          colorScheme="red"
          variant={"outline"}
          isLoading={networkInfo.isLoading}
          isDisabled={
            !(
              networkInfo.data?.status === "provisioning" ||
              networkInfo.data?.status === "ready" ||
              networkInfo.data?.status === "failed"
            )
          }
          onClick={() => {
            openModal("deleteNetwork", { deleteNetwork: { networkId, networkName: networkInfo.data?.name as string } });
          }}
        >
          {<IconTrash className="text-xl" />}
        </IconButton>
      </Tooltip> */}
    </div>
  );
};

export default Actions;
