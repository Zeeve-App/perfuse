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

import { copyFile, readFile, writeFile } from "fs/promises";
export const createTaskHandler = async () => {
  const data = await readFile("/home/perfuse/parachain/checksums.json");
  const checksum = JSON.parse(data.toString());
  const outputChecksum = { wasm: "", genesis: "" };
  await Promise.all(
    Object.keys(checksum).map(async (file) => {
      if (file.includes("wasm")) {
        await copyFile(file, "./public/output/wasm");
        outputChecksum.wasm = checksum[file];
      } else {
        await copyFile(file, "./public/output/genesis");
        outputChecksum.genesis = checksum[file];
      }
    }),
  );

  console.log("outputChecksum", outputChecksum);

  await writeFile("./public/output/checksum.json", JSON.stringify(outputChecksum));
  return;
};
