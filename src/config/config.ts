import dotenv from "dotenv";
dotenv.config();

export const config = {
  server: {
    dbLocation: process.env.SQLITE_DB_LOCATION ?? "./perfuse.sqlite",
    binaryFilePathForCopy: process.env.BINARY_FILE_PATH_FOR_COPY ?? "./perfuse/bin.bin",
    chainSpecFilePathForCopy: process.env.CHAIN_SPEC_FILE_PATH_FOR_COPY ?? "./perfuse/chainspec.json",
    envFilePathForCopy: process.env.ENV_FILE_PATH_FOR_COPY ?? "./perfuse/.env",
  },
  client: {
    host: process.env.NEXT_PUBLIC_HOST ?? "localhost:3000",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  },
};

// console.log(config);
