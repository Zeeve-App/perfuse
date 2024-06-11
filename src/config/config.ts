import dotenv from "dotenv";
dotenv.config();

export const config = {
  server: {
    dbLocation: process.env.SQLITE_DB_LOCATION ?? "",
    binaryFilePathForCopy: process.env.BINARY_FILE_PATH_FOR_COPY ?? "",
    chainSpecFilePathForCopy: process.env.CHAIN_SPEC_FILE_PATH_FOR_COPY ?? "",
    envFilePathForCopy: process.env.ENV_FILE_PATH_FOR_COPY ?? "",
  },
  client: {
    host: process.env.NEXT_PUBLIC_HOST ?? "",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  },
};

// console.log(config);
