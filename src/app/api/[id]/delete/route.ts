import { NextRequest } from "next/server";
import { sendDataResponse, sendErrorResponse } from "../../_helpers/response";
import { deleteNetwork } from "@/db-queries";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const networId = params.id;

    await deleteNetwork(networId);
    return sendDataResponse({
      message: "deleted successfully",
    });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
