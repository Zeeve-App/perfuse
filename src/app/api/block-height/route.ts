import axios, { AxiosResponse } from "axios";
import { sendErrorResponse } from "../_helpers/response";
import { BlockHeightResponsePayload } from "@/api-client/block-number";

export async function GET() {
  try {
    const res: AxiosResponse<BlockHeightResponsePayload> = await axios.post("http://localhost:9010", {
      jsonrpc: "2.0",
      method: "chain_getBlock",
      params: [],
      id: 1,
    });

    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}

export const dynamic = "force-dynamic";
