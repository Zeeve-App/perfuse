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

import dotenv from "dotenv";
dotenv.config();

// TODO: check pkg liscence
export const config = {
  server: {
    dbLocation: process.env.SQLITE_DB_LOCATION || "./perfuse.sqlite",
    binaryFilePathForCopy: process.env.BINARY_FILE_PATH_FOR_COPY || "./perfuse/bin.bin",
    chainSpecFilePathForCopy: process.env.CHAIN_SPEC_FILE_PATH_FOR_COPY || "./perfuse/chainspec.json",
    envFilePathForCopy: process.env.ENV_FILE_PATH_FOR_COPY || "./perfuse/.env",
  },
  client: {
    host: process.env.NEXT_PUBLIC_HOST || "localhost:3000",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    explorer: process.env.NEXT_PUBLIC_EXPLORER_POLKADOT || "https://polkadot.js.org/apps",
  },
};
