import { TaskDbRow } from "@/db-queries";
import { useNetworkStore } from "@/store/network";
import { tx } from "@/utils/shared";

const NetworkStatus = ({ className }: { className?: string }) => {
  const networkInfo = useNetworkStore((e) => e.networkInfo);
  const status = networkInfo.data?.networkStatus ?? "pending";

  const statusLabelMap: Record<TaskDbRow["task_status"], string> = {
    pending: "Pending",
    inprogress: "In Progress",
    completed: "Ready",
    failed: "Failed",
  };
  return (
    <>
      <div
        className={tx(
          {
            "bg-brand-red/10 text-brand-red ": status === "failed",
            "capitalize text-center": true,
            "bg-brand-green/10 text-brand-green": status === "completed",
            "bg-brand-teal/10 text-brand-teal": status === "inprogress",
            "bg-brand-gray/10 text-brand-gray": status === "pending",
          },
          className,
        )}
      >
        {statusLabelMap[status]}
      </div>
    </>
  );
};

export default NetworkStatus;
