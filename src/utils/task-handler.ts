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
