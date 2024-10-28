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

import { NextRequest } from "next/server";
import { serialize } from "cookie";
import { sendDataResponse, sendErrorResponse } from "../../../(protected)/api/_helpers/response";
import { sign } from "@/utils/jwt";
import { config } from "@/config/config";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    if (config.server.defaultEmail !== formData.email || config.server.defaultPassword !== formData.password)
      throw new Error("Invalid user/password");

    const token = await sign({ email: formData.email });

    const tokenCookie = serialize("accessToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * config.server.jwtExpiresIn,
      path: "/",
    });

    return sendDataResponse({}, 200, {
      headers: {
        "Set-Cookie": [tokenCookie].join("; "),
      },
    });
  } catch (error) {
    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
