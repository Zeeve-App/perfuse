import { NextRequest } from "next/server";
import { sendDataResponse, sendErrorResponse } from "../../_helpers/response";
import { deleteNetwork } from "@/db-queries";
import { jobShellExecutorBG } from "@/utils/job-shell-executor";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const networId = params.id;

    await deleteNetwork(networId);
    jobShellExecutorBG("make clean", process.cwd());
    return sendDataResponse({
      message: "deleted successfully",
    });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
