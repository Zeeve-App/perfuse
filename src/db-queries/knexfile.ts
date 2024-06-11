/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
"use server";
import knex from "knex";
import { config } from "@/config/config";

export const knexHandler = knex({
  client: "sqlite3",
  connection: {
    filename: config.server.dbLocation,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  useNullAsDefault: true,
});
