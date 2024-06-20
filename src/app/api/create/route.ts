import fs from "fs/promises";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendDataResponse, sendErrorResponse } from "../_helpers/response";
import { NodeDbRow, addTask, saveNetworkData, saveNodeData } from "@/db-queries";
import { knexHandler } from "@/db-queries/knexfile";
import { config } from "@/config/config";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";

export type CreatePerfuseApiPayload = {
  network: {
    network_name: string;
    network_env: string;
    network_template: string;
    network_relay_chain: string;
    network_sidecar: boolean;
    network_blockchain_explorer: string;
    network_chain_spec_file_json: object;
    network_binary_path: string;
  };
  nodes: Array<
    | {
        node_name: string;
        node_type: "collator";
        node_address: string;
        node_rpc_cors: string;
        node_balance: number;
      }
    | {
        node_name: string;
        node_type: "rpc";
        node_auth_method: "api_key" | "basic_auth";
        node_username: string;
        node_password: string;
        node_https_enabled: boolean;
        node_wss_enabled: boolean;
      }
  >;
};

export async function POST(req: NextRequest) {
  try {
    const formData: CreatePerfuseApiPayload = await req.json();
    console.log(formData);

    const network_id = uuidv4();
    const taskId = uuidv4();
    const apiKey = crypto.randomBytes(30).toString("hex");

    await knexHandler.transaction(async (trx) => {
      try {
        await saveNetworkData(
          {
            ...formData.network,
            network_id,
            network_sidecar: formData.network.network_sidecar ? 1 : 0,
            network_chain_spec_file_json: JSON.stringify(formData.network.network_chain_spec_file_json),
            network_relay_chain_version: "v1.9.0",
          },
          trx,
        );

        await addTask(
          {
            task_id: taskId,
            task_type: "network_provision",
            task_status: "inprogress",
            task_description: "this task is to deploy network",
            task_associated_network_id: network_id,
            task_retry_count: 5,
          },
          trx,
        );

        await Promise.all(
          formData.nodes.map(async (e) => {
            const isRpc = e.node_type === "rpc";
            const node: NodeDbRow = {
              ...e,
              network_id,
              node_id: uuidv4(),
              node_wss_enabled: !isRpc ? undefined : e.node_wss_enabled ? 1 : 0,
              node_https_enabled: !isRpc ? undefined : e.node_https_enabled ? 1 : 0,
              node_api_key: isRpc && e.node_auth_method === "api_key" ? apiKey : undefined,
            };
            await saveNodeData(node, trx);
          }, trx),
        );

        if (formData.network.network_template === "custom")
          await fs.copyFile(
            formData.network.network_binary_path,
            config.server.binaryFilePathForCopy,
            // fs.constants.COPYFILE_EXCL,
          );

        await fs.writeFile(config.server.envFilePathForCopy, createEnvFile(formData, apiKey));

        await fs.writeFile(
          config.server.chainSpecFilePathForCopy,
          JSON.stringify(formData.network.network_chain_spec_file_json),
        );

        jobShellExecutorBG("make all", process.cwd(), taskId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    return sendDataResponse({ network_id });
  } catch (error) {
    console.log(error);

    return sendErrorResponse({
      message: "Error while creating",
    });
  }
}

const createEnvFile = (data: CreatePerfuseApiPayload, apiKey?: string) => {
  const collatorNodes = data.nodes.filter((e) => e.node_type === "collator");
  const rpcNode = data.nodes.find((e) => e.node_type === "rpc");
  if (rpcNode?.node_type !== "rpc") {
    throw new Error("rpc node not exist");
  }
  const envFile =
    `POLKA_VERSION=${"v1.9.0"}\n` +
    `NETWORK_TYPE=${data.network.network_env ?? ""}\n` +
    `COL_NAME_1=${collatorNodes[0]?.node_name ?? ""}\n` +
    `COL_NAME_2=${collatorNodes[1]?.node_name ?? ""}\n` +
    `RPC_NAME=${rpcNode?.node_name ?? ""}\n` +
    `RPC_USER=${rpcNode?.node_username ?? ""}\n` +
    `RPC_PASS=${rpcNode?.node_password ?? ""}\n` +
    `RPC_API_KEY=${apiKey ?? ""}\n` +
    `AUTH_METHOD=${rpcNode?.node_auth_method ?? ""}\n` +
    `TEMPLATE=${data.network.network_template ?? ""}\n` +
    `SIDECAR=${data.network.network_sidecar ? 1 : 0}\n` +
    `SCRIPT_USER=STEM\n` +
    `REPO=\n` +
    ``;

  return envFile;
};
