import { writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import { sendDataResponse, sendErrorResponse } from "../_helpers/response";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await writeFile(`./public/uploads/${file.name}`, buffer);

    return sendDataResponse({
      message: "File uploaded successfully",
      path: `./public/uploads/${file.name}`,
    });
  } catch (error) {
    console.log(error);

    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
