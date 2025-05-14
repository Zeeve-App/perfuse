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
import * as yup from "yup";
dotenv.config();

/** Configs for the application */
const rawConfig = {
  /** server side configuration */
  server: {
    /** db path of the sqlite file */
    dbLocation: process.env.SQLITE_DB_LOCATION || "./perfuse.sqlite",
    /** binary path of the uploaded binary */
    binaryFilePathForCopy: process.env.BINARY_FILE_PATH_FOR_COPY || "./perfuse/polkadot-parachain",
    /** chain spec file path of the created/uploaded chain spec */
    chainSpecFilePathForCopy: process.env.CHAIN_SPEC_FILE_PATH_FOR_COPY || "./perfuse/chainspec.json",
    /** generated env file path for the perfuse */
    envFilePathForCopy: process.env.ENV_FILE_PATH_FOR_COPY || "./perfuse/.env",
    /** jwt secret to be used in signing and verifying the token */
    jwtSecret: process.env.JWT_SECRET,
    /** jwt expires time in hours */
    jwtExpiresIn: process.env.JWT_EXPIRES,
    /** default email to be used in the login */
    defaultEmail: process.env.DEFAULT_EMAIL,
    /** default password to be used in the login */
    defaultPassword: process.env.DEFAULT_PASS,
    /** relay chain version which will be saved in the db */
    relayChainVersion: process.env.RELAY_CHAIN_VERSION || "stable2407",
  },
  /** clients & server side configuration */
  client: {
    /** hostname */
    host: process.env.NEXT_PUBLIC_HOST || "localhost:3000",
    /** base path of the server */
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    /**
     * polkadot.js explorer url if u are using any custom explorer,
     * it will use this and add newly created parachain rpc in it.
     * */
    explorer: process.env.NEXT_PUBLIC_EXPLORER_POLKADOT || "https://polkadot.js.org/apps",
  },
};

/** validating the config */
const envSchema = yup.object({
  server: yup.object({
    dbLocation: yup.string().required("db file location is required"),
    binaryFilePathForCopy: yup.string().required(),
    chainSpecFilePathForCopy: yup.string().required(),
    envFilePathForCopy: yup.string().required(),
    jwtSecret: yup.string().required(),
    jwtExpiresIn: yup.number().required(),
    defaultEmail: yup.string().required(),
    defaultPassword: yup.string().required(),
    relayChainVersion: yup.string().required(),
  }),
  client: yup.object({
    host: yup.string().required(),
    basePath: yup.string(),
    explorer: yup.string().required(),
  }),
});

export const config = envSchema.validateSync(rawConfig);
