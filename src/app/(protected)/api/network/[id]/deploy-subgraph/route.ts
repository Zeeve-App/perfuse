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
"use server";
import { copyFile, writeFile } from "fs/promises";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import { sendDataResponse, sendErrorResponse } from "../../../_helpers/response";
import { NodeDbRow, addTask, saveNetworkData, saveNodeData } from "@/db-queries";
import { knexHandler } from "@/db-queries/knexfile";
import { config } from "@/config/config";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";

export interface DeploySubgraphApiPayload {
  sub_ql_access_token: string;
}

/** post api for creating parachain network */
export async function POST(req: NextRequest) {
  try {
    /** getting json data from the api request body */
    const formData: DeploySubgraphApiPayload = await req.json();
    /** http headers of the request */
    const headersList = headers();
    const host = headersList.get("host");
    const domain = host?.split(":")[0];

    const network_id = uuidv4();
    const taskId = uuidv4();
    const apiKey = crypto.randomBytes(30).toString("hex");

    /** creating knex transaction */
    await knexHandler.transaction(async (trx) => {
      try {
        /** saving network details */

        /** creating env file for the scripts */
        await writeFile(config.server.envFilePathForCopy, createEnvFile(formData));

        /** running the script to create the parachain network */
        jobShellExecutorBG("make all", process.cwd(), async () => {}, taskId);
      } catch (error) {
        /** if there is any error while creating network it auto rollback the transaction */
        console.log(error);
        throw error;
      }
    });

    /** sending response back to the client */
    return sendDataResponse({ network_id });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);

    /** sending the error response back to the client */
    return sendErrorResponse({
      message: error.message ?? "Error while creating",
    });
  }
}

/** creating env file for script from the api request payload */
const createEnvFile = (data: DeploySubgraphApiPayload) => {
  const envFile = `SUBQL_ACCESS_TOKEN=${data.sub_ql_access_token}\n` + ``;

  return envFile;
};
