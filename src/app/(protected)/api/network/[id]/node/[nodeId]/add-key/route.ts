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
import axios from "axios";
import { getNodeData, updateNodeData } from "@/db-queries";
import { sendDataResponse, sendErrorResponse } from "@/app/(protected)/api/_helpers/response";
import { addressToHexPublicKey } from "@/utils/wallet";

/** post api for adding key to the collator */
export async function POST(req: NextRequest, { params }: { params: { id: string; nodeId: string } }) {
  try {
    const { seed, pubKey }: { seed: string; pubKey: string } = await req.json();
    const nodeId = params.nodeId;

    /** converting key to hex */
    const key = addressToHexPublicKey(pubKey);

    /** making json rpc payload */
    const jsonData = {
      jsonrpc: "2.0",
      method: "author_insertKey",
      params: ["aura", seed, key],
      id: 1,
    };

    console.log({ jsonData });

    const node = await getNodeData({ node_id: nodeId });
    if (!node) throw new Error("invalid node id");

    /** calling rpc of the collator node based on there there name */
    const response = await axios.post(
      node.node_name.endsWith("1") ? `http://localhost:9008` : `http://localhost:9009`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    await updateNodeData({ node_id: nodeId, node_collator_seed_added: 1 });
    console.log(response.data); // Handle the response data

    return sendDataResponse({
      node: node,
    });
    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);

    return sendErrorResponse({
      message: error.message ?? "Internal server error",
    });
  }
}
