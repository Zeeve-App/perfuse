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
import { sendDataResponse, sendErrorResponse } from "../_helpers/response";
import { NodeDbRow, addTask, saveNetworkData, saveNodeData } from "@/db-queries";
import { knexHandler } from "@/db-queries/knexfile";
import { config } from "@/config/config";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";
import { createWallet } from "@/utils/wallet";

export interface CreatePerfuseApiPayload {
  /** network details from user */
  network: {
    /** network/chain name from the user */
    network_name: string;
    /** network env from the user testnet/mainnet */
    network_env: string;
    /** network template which is used to create the chainSpec and  binary */
    network_template: string;
    /** relay chain in which the parachain is created */
    network_relay_chain_type: string;
    /** sidecar is enabled or not */
    network_sidecar: 0 | 1;
    /** network blockchain explorer type */
    network_blockchain_explorer_type: string;
    /** network chain spec file raw json */
    network_chain_spec_file_json: object;
    /** network binary file path */
    network_binary_path: string;
    /** network user address */
    network_user_address: string;
  };
  nodes: Array<CollatorNodePayload | RPCNodePayload>;
}

interface CollatorNodePayload {
  /** collator node name */
  node_name: string;
  /** node type */
  node_type: "collator";
  /** collator address */
  node_address: string;
  /** node rpc cors allow list "*" default */
  node_rpc_cors: string;
  /** collator node balance */
  node_balance: number;
}
interface RPCNodePayload {
  /** rpc node name */
  node_name: string;
  /** node type  */
  node_type: "rpc";
  /** node auth method for rpc calls */
  node_auth_method: "api_key" | "basic_auth";
  /** node username if auth method is basic auth */
  node_username: string;
  /** node password if auth method is basic auth */
  node_password: string;
  /** node http enabled  */
  node_https_enabled: boolean;
  /** node websocket enabled */
  node_wss_enabled: boolean;
  /** node endpoint for rpc calls */
  node_endpoint?: string;
}

/** post api for creating parachain network */
export async function POST(req: NextRequest) {
  try {
    /** getting json data from the api request body */
    const formData: CreatePerfuseApiPayload = await req.json();
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
        await saveNetworkData(
          {
            ...formData.network,
            network_id,
            network_sidecar: formData.network.network_sidecar ? 1 : 0,
            network_chain_spec_file_json: JSON.stringify(formData.network.network_chain_spec_file_json),
            network_relay_chain_version: config.server.relayChainVersion,

            created_at: new Date().toISOString(),
            network_coretime_type: "regionx",
            network_user_address: formData.network.network_user_address,
          },
          trx,
        );

        /** adding task in the db */
        await addTask(
          {
            task_id: taskId,
            task_type: "network_provision",
            task_status: "inprogress",
            task_description: "this task is to deploy network",
            task_associated_network_id: network_id,
            task_retry_count: 5,
            task_created_at: new Date().toISOString(),
            task_updated_at: new Date().toISOString(),
          },
          trx,
        );

        /** adding nodes details in the db */
        await Promise.all(
          /** iterating through the node array in api request */
          formData.nodes.map(async (e) => {
            const isRpc = e.node_type === "rpc";
            const wallet = await createWallet();

            console.log({ wallet });

            const node: NodeDbRow = {
              ...e,
              network_id,
              node_id: uuidv4(),
              node_wss_enabled: !isRpc ? undefined : e.node_wss_enabled ? 1 : 0,
              node_https_enabled: !isRpc ? undefined : e.node_https_enabled ? 1 : 0,
              node_api_key: isRpc && e.node_auth_method === "api_key" ? apiKey : undefined,
              node_endpoint: isRpc ? e.node_endpoint ?? domain : undefined,
              created_at: new Date().toISOString(),
              /** TODO: encrypt the seed */
              node_collator_session_address: isRpc ? undefined : wallet.address,
              node_collator_session_seed: isRpc ? undefined : wallet.mnemonic,
            };
            /** saving node details */
            await saveNodeData(node, trx);
          }, trx),
        );

        /** if user didn't used any template */
        if (formData.network.network_template === "custom")
          /** copying file from upload directory to main location */
          await copyFile(formData.network.network_binary_path, config.server.binaryFilePathForCopy);

        /** creating env file for the scripts */
        await writeFile(config.server.envFilePathForCopy, createEnvFile(formData, apiKey));

        /** saving the chain spec file to main location so that scripts can consume the chain spec file*/
        await writeFile(
          config.server.chainSpecFilePathForCopy,
          JSON.stringify(formData.network.network_chain_spec_file_json),
        );

        /** running the script to create the parachain network */
        jobShellExecutorBG("make all", process.cwd(), taskId);
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
const createEnvFile = (data: CreatePerfuseApiPayload, apiKey?: string) => {
  const headersList = headers();
  const host = headersList.get("host");
  const domain = host?.split(":")[0];
  const collatorNodes = data.nodes.filter((e) => e.node_type === "collator");
  const rpcNode = data.nodes.find((e) => e.node_type === "rpc");
  if (rpcNode?.node_type !== "rpc") {
    throw new Error("rpc node not exist");
  }
  const envFile =
    `POLKA_VERSION=${config.server.relayChainVersion}\n` +
    `NETWORK_TYPE=${data.network.network_relay_chain_type.toLowerCase() ?? ""}\n` +
    `COL_NAME_1=${collatorNodes[0]?.node_name ?? ""}\n` +
    `COL_NAME_2=${collatorNodes[1]?.node_name ?? ""}\n` +
    `RPC_NAME=${rpcNode?.node_name ?? ""}\n` +
    `ENDPOINT_AUTH=${rpcNode?.node_auth_method ?? ""}\n` +
    `RPC_USER=${rpcNode?.node_username ?? ""}\n` +
    `RPC_PASS=${rpcNode?.node_password ?? ""}\n` +
    `RPC_API_KEY=${apiKey ?? ""}\n` +
    `AUTH_METHOD=${rpcNode?.node_auth_method ?? ""}\n` +
    `SIDECAR=${data.network.network_sidecar ? 1 : 0}\n` +
    `TEMPLATE=${data.network.network_template ?? ""}\n` +
    `DOMAIN=${domain}\n` +
    `EMAIL=rahul.meena@zeeve.io\n` +
    `SCRIPT_USER=STEM\n` +
    `SSL_TLS=0\n` +
    `ACCOUNT_ADDRESS=${data.network.network_user_address}\n` +
    `REPO=\n` +
    ``;

  return envFile;
};
