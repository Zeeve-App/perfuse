import { NextRequest } from "next/server";
import { getNodeData } from "@/db-queries";
import { sendDataResponse, sendErrorResponse } from "@/app/api/_helpers/response";

export async function GET(req: NextRequest, { params }: { params: { id: string; nodeId: string } }) {
  try {
    const networId = params.id;
    const nodeId = params.nodeId;

    const node = await getNodeData({ node_id: nodeId, network_id: networId });
    return sendDataResponse({
      ...node,
    });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
