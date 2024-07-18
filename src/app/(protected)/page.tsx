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

import { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";
import ListPageClient from "./page-client";
import { getNetworks } from "@/db-queries";

export const metadata: Metadata = {
  title: "Perfuse | Dashboard",
  description: "Dashboard of perfuse",
};

const ListPage = async () => {
  const networks = await getNetworks();

  if (networks.length > 0 && networks?.[0]?.network_id) {
    redirect("/network/" + networks?.[0]?.network_id);
  }

  return <ListPageClient />;
};

export default ListPage;
export const dynamic = "force-dynamic";
