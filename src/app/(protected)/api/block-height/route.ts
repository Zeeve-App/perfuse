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
import axios, { AxiosResponse } from "axios";
import { sendErrorResponse } from "../_helpers/response";
import { BlockHeightResponsePayload } from "@/api-client/block-number";

/** getting the block height of the parachain from rpc call */
export async function GET() {
  try {
    /** rpc call on the deployed network */
    const res: AxiosResponse<BlockHeightResponsePayload> = await axios.post("http://localhost:9010", {
      jsonrpc: "2.0",
      method: "chain_getBlock",
      params: [],
      id: 1,
    });

    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while fetching block height",
    });
  }
}

/**
 * to forces the route handler to be dynamically evaluated, export a `dynamic` variable
 */
export const dynamic = "force-dynamic";
