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
import CollatorNodes from "./_components/collator-nodes";
import { getNodesWithStatus } from "@/db-queries";

/** collator nodes page metadata */
export const metadata: Metadata = {
  title: "Perfuse | Parachain Details",
  description: "nodes of parachain node",
};

/** collator node main page Component */
const CollatorNodePage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const nodes = await getNodesWithStatus(params.id);
  return (
    <CollatorNodes
      nodes={{
        collator: nodes.filter((e) => e.node_type === "collator"),
      }}
    />
  );
};

export default CollatorNodePage;
