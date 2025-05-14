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

import { readFile, writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendDataResponse, sendErrorResponse } from "../../../_helpers/response";
import { config } from "@/config/config";
import { addTask, getNetworkData, updateNetworkData } from "@/db-queries";
import { knexHandler } from "@/db-queries/knexfile";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";
/** rest api for deleting network */

export interface EnableServiceApiPayload {
  serviceName: string;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const networId = params.id;
    const formData: EnableServiceApiPayload = await req.json();
    const key = formData.serviceName === "polkadotjs" ? "polkadot_active" : "statescan_active";
    const taskId = uuidv4();
    await knexHandler.transaction(async (trx) => {
      try {
        const networkData = await getNetworkData(networId, trx);
        let explorerList = networkData?.network_blockchain_explorer_type;
        explorerList += "," + formData.serviceName;
        await updateNetworkData({ [key]: true, network_blockchain_explorer_type: explorerList }, networId, trx);
        /** adding task in the db */

        await addTask(
          {
            task_id: taskId,
            task_type: "explorer_deployment",
            task_status: "inprogress",
            task_description: "this task is to deploy explorer",
            task_associated_network_id: networId,
            task_retry_count: 5,
            task_created_at: new Date().toISOString(),
            task_updated_at: new Date().toISOString(),
          },
          trx,
        );
        const explorerName = formData.serviceName === "polkadotjs" ? "POLKADOT" : "STATESCAN";
        await updateEnvVariable(config.server.envFilePathForCopy, explorerName, 1);

        /** running the script to create the parachain network */
        if (formData.serviceName === "polkadotjs")
          jobShellExecutorBG("make polkadotjs_app", process.cwd(), async () => {}, taskId);
        else if (formData.serviceName === "statescan")
          jobShellExecutorBG("make statescan", process.cwd(), async () => {}, taskId);
      } catch (error) {
        /** if there is any error while creating network it auto rollback the transaction */
        console.log(error);
        throw error;
      }
    });

    return sendDataResponse({
      message: `updated network ${formData.serviceName} successfully`,
    });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while enabling service",
    });
  }
}

async function updateEnvVariable(filePath: string, key: string, newValue: string | number) {
  let content = await readFile(filePath, "utf-8");

  const regex = new RegExp(`^${key}=.*$`, "m");

  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${newValue}`);
  } else {
    content += `\n${key}=${newValue}`;
  }

  await writeFile(filePath, content, "utf-8");
}
