import { NextRequest } from "next/server";
import axios from "axios";
import { sendErrorResponse } from "../_helpers/response";

export async function GET(req: NextRequest) {
  try {
    const res = await axios.post("http://localhost:9010", {
      jsonrpc: "2.0",
      method: "chain_getBlock",
      params: [],
      id: 1,
    });

    return res.data;
  } catch (error) {
    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
