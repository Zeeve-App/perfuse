import { TaskDbRow } from "@/db-queries";
import { useNetworkStore } from "@/store/network";
import { tx } from "@/utils/shared";

const NetworkStatus = ({ className }: { className?: string }) => {
  const networkInfo = useNetworkStore((e) => e.networkInfo);
  const status = networkInfo.data?.networkStatus ?? "pending";
  const authorizationStatus = networkInfo.data?.blockHeight == 0;

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
            "capitalize text-center font-semibold ": true,
            "bg-brand-green/10 text-brand-green": status === "completed",
            "bg-brand-teal/10 text-brand-teal": status === "inprogress",
            "bg-brand-gray/10 text-brand-gray": status === "pending",
            "bg-brand-red/10 text-brand-red ": status === "failed" || (status === "completed" && authorizationStatus),
          },
          className,
        )}
      >
        {status !== "completed"
          ? statusLabelMap[status]
          : authorizationStatus
            ? "Authentication Pending"
            : statusLabelMap[status]}
      </div>
    </>
  );
};

export default NetworkStatus;
