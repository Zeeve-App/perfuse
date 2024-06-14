/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
"use server";
import knex, { Knex } from "knex";
import { Database, RunResult } from "sqlite3";
import { config } from "@/config/config";

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
