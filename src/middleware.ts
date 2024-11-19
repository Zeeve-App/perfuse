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

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { parse } from "cookie";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { sendErrorResponse } from "./app/(protected)/api/_helpers/response";
import { verify } from "./utils/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware() {
  const header = headers();
  const data = await authFromHeader(header);
  const tokenCookie = serialize("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
    path: "/",
  });

  if (!data?.email) {
    return sendErrorResponse({ message: "no token" }, 400, {
      headers: {
        "Set-Cookie": [tokenCookie].join("; "),
      },
    });
  }
  console.log("middleware passs => => =>");
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all API routes except /api/login
    "/api((?!/login|/logout).*)",
  ],
};

export async function authFromHeader(header: ReadonlyHeaders) {
  try {
    const rawCookie = header.get("cookie");
    const cookie = parse(rawCookie ?? "");
    const token = cookie["accessToken"];
    const data = await verify(token as string);
    return data;
  } catch (error) {
    console.log(error);

    return undefined;
  }
}

export function themeFromHeader(header: ReadonlyHeaders): "dark" | "light" {
  try {
    const rawCookie = header.get("cookie");
    const cookie = parse(rawCookie ?? "");
    const theme = cookie["theme"];
    return theme == "dark" ? "dark" : "light";
  } catch (error) {
    console.log(error);

    return "light";
  }
}
