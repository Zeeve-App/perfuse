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
