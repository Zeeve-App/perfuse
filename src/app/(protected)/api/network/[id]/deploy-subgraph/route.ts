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
import { NodeDbRow, addTask, getNodeData, saveNetworkData, saveNodeData } from "@/db-queries";
import { knexHandler } from "@/db-queries/knexfile";
import { config } from "@/config/config";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";

export interface DeploySubgraphApiPayload {
  subqlAccessToken: string;
}

/** post api for deploying subgraph */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    /** getting json data from the api request body */
    const formData: DeploySubgraphApiPayload = await req.json();
    const networkId = params.id;
    const taskId = uuidv4();

    /** creating knex transaction */
    await knexHandler.transaction(async (trx) => {
      try {
        /** adding task in the db */
        await addTask(
          {
            task_id: taskId,
            task_type: "subgraph_deployment",
            task_status: "inprogress",
            task_description: "this task is to deploy subgraph",
            task_associated_network_id: networkId,
            task_retry_count: 5,
            task_created_at: new Date().toISOString(),
            task_updated_at: new Date().toISOString(),
          },
          trx,
        );
        /** getting rpc api key from db */
        const apiKey = (await getNodeData({ network_id: networkId, node_type: "rpc" }, trx)).node_api_key;

        /** creating env file for the scripts */
        await writeFile(config.server.subquery, createEnvFile(formData, apiKey));

        /** running the script to deploy subgraph */
        jobShellExecutorBG("make subquery", process.cwd(), async () => {}, taskId);
      } catch (error) {
        /** if there is any error while creating network it auto rollback the transaction */
        console.log(error);
        throw error;
      }
    });

    /** sending response back to the client */
    return sendDataResponse({ networkId });
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
const createEnvFile = (data: DeploySubgraphApiPayload, apiKey?: string) => {
  const envFile = `RPC_API_KEY=${apiKey ?? ""}\n` + `SUBQL_ACCESS_TOKEN=${data.subqlAccessToken}\n` + ``;

  return envFile;
};
