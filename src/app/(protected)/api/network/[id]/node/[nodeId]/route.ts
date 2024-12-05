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

import { NextRequest } from "next/server";
import { getNodeData } from "@/db-queries";
import { sendDataResponse, sendErrorResponse } from "@/app/(protected)/api/_helpers/response";
import { isRpcNodeWorking } from "@/utils/wallet";

/** api to get node data from node id */
export async function GET(req: NextRequest, { params }: { params: { id: string; nodeId: string } }) {
  try {
    const networkId = params.id;
    const nodeId = params.nodeId;

    const node = await getNodeData({ node_id: nodeId, network_id: networkId });

    return sendDataResponse({
      ...node,
      health: await isRpcNodeWorking(node.rpcUrl),
    });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
