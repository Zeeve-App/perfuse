import { v4 as uuidv4 } from "uuid";
import { knexHandler } from "@/db-queries/knexfile";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";
import { addTask } from "@/db-queries";

export async function installExplorer(explorer: string) {
  try {
    const network_id = uuidv4();
    const taskId = uuidv4();

    /** creating knex transaction */
    await knexHandler.transaction(async (trx) => {
      try {
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

        /** running the script to create the parachain network */
        if (explorer === "polkadotjs")
          jobShellExecutorBG("make polkadotjs_app", process.cwd(), async () => {}, taskId);
        else if (explorer === "statescan")
          jobShellExecutorBG("make statescan", process.cwd(), async () => {}, taskId);
      } catch (error) {
        /** if there is any error while creating network it auto rollback the transaction */
        console.log(error);
        throw error;
      }
    });
  } catch (error: any) {
    console.log(error);
  }
}
