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

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
"use server";
import knex from "knex";
import { Database, RunResult } from "sqlite3";
import { config } from "@/config/config";

/** knex handler to create a sqlite connection */
export const knexHandler = knex({
  client: "sqlite3",
  connection: {
    filename: config.server.dbLocation,
  },
  pool: {
    afterCreate: (conn: Database, cb: (this: RunResult, err: Error | null) => void) =>
      conn.run("PRAGMA foreign_keys = ON", cb),
  },
  migrations: {
    tableName: "knex_migrations",
  },
  useNullAsDefault: true,
});

knexHandler.raw("PRAGMA foreign_keys = ON");
