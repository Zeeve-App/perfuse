/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  dev: {
    client: "sqlite3",
    connection: {
      filename: process.env.SQLITE_DB_LOCATION ?? "./perfuse.sqlite",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
};
