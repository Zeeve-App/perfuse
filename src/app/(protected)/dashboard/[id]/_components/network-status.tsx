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

import React from "react";
import { TaskDbRow } from "@/db-queries";
import { Badge } from "@/lib/components/Badge/Badge";
import { useNetworkStore } from "@/store/network";
import { tx } from "@/utils/shared";

/** network status component */
const NetworkStatus = ({ className, health }: { className?: string; health?: boolean }) => {
  const networkInfo = useNetworkStore((e) => e.networkInfo);
  const status = networkInfo.data?.networkStatus ?? "pending";
  const authorizationStatus = networkInfo.data?.blockHeight == 0;

  const statusLabelMap: Record<TaskDbRow["task_status"], string> = {
    pending: "Pending",
    inprogress: "In Progress",
    completed: "Ready",
    failed: "Failed",
  };

  /** get variant from the status of the network */
  const getVariant = (status: TaskDbRow["task_status"]) => {
    if (status == "completed" && health !== undefined) {
      return "green";
    }
    if (status == "completed" && authorizationStatus) {
      return "red";
    }
    if (status == "completed") {
      return "green";
    }
    return "purple";
  };

  function getStatusLabel() {
    if (status !== "completed") {
      return statusLabelMap[status];
    }

    if (health !== undefined) {
      if (health) return "Healthy";
      else return "Unhealthy";
    }

    if (authorizationStatus) {
      return <>Auth.&nbsp;Pending</>;
    }

    return statusLabelMap[status];
  }

  return (
    <>
      <Badge variant={getVariant(status)} className={tx(className)}>
        {getStatusLabel()}
      </Badge>
    </>
  );
};

export default NetworkStatus;
