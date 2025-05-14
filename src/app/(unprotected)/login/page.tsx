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

import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./page-client";
import { authFromHeader } from "@/middleware";

/** login page metadata */
export const metadata: Metadata = {
  title: "Perfuse | Login",
  description: "Create parachain with peruse",
};

/** login page */
const LoginPage = async () => {
  const header = headers();
  const data = await authFromHeader(header);

  if (data?.email) {
    return redirect("/");
  }
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
export const dynamic = "force-dynamic";
