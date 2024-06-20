import fs from "fs/promises";
export const createTaskHandler = async () => {
  const data = await fs.readFile("/home/perfuse/parachain/checksums.json");
  const checksum = JSON.parse(data.toString());
  const outputChecksum = { wasm: "", genesis: "" };
  await Promise.all(
    Object.keys(checksum).map(async (file) => {
      if (file.includes("wasm")) {
        await fs.copyFile(file, "./public/output/wasm");
        outputChecksum.wasm = checksum[file];
      } else {
        await fs.copyFile(file, "./public/output/genesis");
        outputChecksum.genesis = checksum[file];
      }
    }),
  );

  console.log("outputChecksum", outputChecksum);

  await fs.writeFile("./public/output/checksum.json", JSON.stringify(outputChecksum));
};
