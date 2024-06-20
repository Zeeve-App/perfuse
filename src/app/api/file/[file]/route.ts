import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { file: string } }) {
  const imagePath = params.file;

  const filePath = path.resolve(".", `./public/output/${imagePath}`);
  const imageBuffer = fs.readFileSync(filePath);
  return new Response(imageBuffer, {
    headers: {
      "Content-Type": req.headers.get("accept")?.toString() ?? "",
    },
  });
}
