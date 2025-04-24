import { v4 as uuidv4 } from "uuid";
import { addTask } from "@/db-queries";
import { knexHandler } from "@/db-queries/knexfile";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";
import { createExplorerHandler } from "@/utils/task-handler";
import { NextRequest } from "next/server";
import { sendDataResponse, sendErrorResponse } from "../../../_helpers/response";
import { CreatePerfuseApiPayload } from "../../../create/route";


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      /** getting json data from the api request body */
      const formData: CreatePerfuseApiPayload = await req.json();
      const network_id = params.id;
      // Extract the 'explorer' query parameter
      const explorer = req.nextUrl.searchParams.get("explorer");

      const taskId = uuidv4();
  
      /** creating knex transaction */
      await knexHandler.transaction(async (trx) => {
        try {

          /** adding task in the db */
          await addTask(
            {
              task_id: taskId,
              task_type: "explorer_deployment",
              task_status: "inprogress",
              task_description: `this task is to deploy ${explorer} explorer`,
              task_associated_network_id: network_id,
              task_retry_count: 5,
              task_created_at: new Date().toISOString(),
              task_updated_at: new Date().toISOString(),
            },
            trx,
          );
  
          /** running the script to create the parachain network */
          jobShellExecutorBG("make all", process.cwd(), async () => {createExplorerHandler(network_id)}, taskId);
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