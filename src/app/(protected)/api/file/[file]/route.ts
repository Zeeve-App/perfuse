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

import path from "path";
import { readFile } from "fs/promises";
import { NextRequest } from "next/server";

/** sending output file to user dynamically */
export async function GET(req: NextRequest, { params }: { params: { file: string } }) {
  const imagePath = params.file;

  /** location of the files for serving dynamically to client */
  const filePath = path.resolve(".", `./public/output/${imagePath}`);
  /** creating a buffer */
  const imageBuffer = await readFile(filePath);
  return new Response(imageBuffer, {
    headers: {
      /** content type, what was in the request accept header */
      "Content-Type": req.headers.get("accept")?.toString() ?? "",
    },
  });
}
