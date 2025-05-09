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

import { NextRequest } from "next/server";
import { getAllTasks } from "@/db-queries";
import { sendDataResponse, sendErrorResponse } from "@/app/(protected)/api/_helpers/response";

/** api to get all task with network id */
export async function GET(req: NextRequest, { params }: { params: { id: string; networkId: string } }) {
  try {
    const networkId = params.id;
    const payload = { task_associated_network_id: networkId };

    const tasks = await getAllTasks(payload);

    const pendingTasks = tasks?.filter((task) => task.task_status == "inprogress" || task.task_status == "pending");

    return sendDataResponse({ pendingTasks });
  } catch (error) {
    return sendErrorResponse({
      message: "Error fetching tasks",
    });
  }
}
