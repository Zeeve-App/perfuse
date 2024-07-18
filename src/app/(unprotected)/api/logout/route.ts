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

export async function POST(req: NextRequest) {
  try {
    const tokenCookie = serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
      path: "/",
    });

    return sendDataResponse({ message: "logout success" }, 200, {
      headers: {
        "Set-Cookie": [tokenCookie].join("; "),
      },
    });
  } catch (error) {
    console.log(error);

    return sendErrorResponse({
      message: "Error while uploading file",
    });
  }
}
