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
import CreatePageClient from "./page-client";
import NoData from "./_components/no-data";
import { getNetworks } from "@/db-queries";

export const metadata: Metadata = {
  title: "Perfuse | Create Parachain",
  description: "Create parachain with peruse",
};

const CreatePage = async () => {
  const networks = await getNetworks();
  return (
    <>
      <div className="flex flex-col gap-y-3 lg:gap-y-6">{networks.length < 1 ? <CreatePageClient /> : <NoData />}</div>
    </>
  );
};

export default CreatePage;
export const dynamic = "force-dynamic";
