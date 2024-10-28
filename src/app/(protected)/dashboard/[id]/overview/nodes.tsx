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

"use client";
import React from "react";
import NetworkStatus from "../_components/network-status";
import { Button, IconButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { ColumnDef, ReactTable, createColumnHelper } from "@/lib/components/ReactTable";
import { NodeDbRow } from "@/db-queries";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import { Typography } from "@/lib/components/Typography";
import { Badge } from "@/lib/components/Badge/Badge";
import { formatEndpoint, toShortString } from "@/utils/helpers";

const columnHelper = createColumnHelper<NodeDbRow>();
// table columns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTableColumns: ColumnDef<NodeDbRow, any>[] = [
  columnHelper.accessor("node_name", {
    header: "Name",
    cell: (info) => info.getValue(), // just an example to style a column/cell
  }),
  columnHelper.accessor("node_type", {
    header: "Type",
    cell: (info) => info.getValue().toUpperCase(),
  }),
  columnHelper.accessor("node_id", {
    header: "Status",
    cell: (_info) => <NetworkStatus className="text-xs" />,
  }),
];

const Nodes = ({ isLoading, nodes }: { isLoading: boolean; nodes: NodeDbRow[] }) => {
  const rowPerPage = 3;
  console.log(nodes);

  return (
    <div className="col-span-10 flex flex-col gap-3 rounded-lg bg-theme-foreground shadow-brand-shadow lg:col-span-4 lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <div className="col-span-6 px-4 pt-4">
          <Heading as="h4">Nodes</Heading>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 flex flex-col gap-3">
          <div className="grid grid-cols-12 justify-between gap-3 px-4">
            <Typography variant="heading" className="col-span-6">
              Name
            </Typography>
            <Typography variant="heading" className="col-span-3">
              Node Type
            </Typography>
            <Typography variant="heading" className="col-span-3">
              Status
            </Typography>
          </div>
          <hr />
          {nodes
            .filter((e) => e.node_type === "rpc")
            .map((e) => (
              <div key={e.node_id}>
                <div className="grid grid-cols-12 justify-between gap-3 px-4">
                  <>
                    <Typography variant="paragraph" className="col-span-6">
                      {e.node_name}
                    </Typography>
                    <Typography variant="paragraph" className="col-span-3">
                      {e.node_type.toUpperCase()}
                    </Typography>
                    <div className="col-span-3">
                      <Badge variant="green">Ready</Badge>
                    </div>
                  </>
                </div>
                <div className="grid grid-cols-12 justify-between gap-3 bg-theme-background p-4">
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"Wss Url"}
                    value={toShortString(
                      formatEndpoint("wss", e.node_endpoint, e.node_auth_method, e.node_api_key),
                      5,
                      5,
                    )}
                    shouldAllowCopy
                    tooltipText={formatEndpoint("wss", e.node_endpoint, e.node_auth_method, e.node_api_key)}
                  />
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"Https Url"}
                    value={toShortString(
                      formatEndpoint("https", e.node_endpoint, e.node_auth_method, e.node_api_key),
                      5,
                      5,
                    )}
                    shouldAllowCopy
                    tooltipText={formatEndpoint("https", e.node_endpoint, e.node_auth_method, e.node_api_key)}
                  />
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"Authentication type"}
                    value={e.node_auth_method ?? ""}
                  />
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"API Key"}
                    shouldAllowCopy
                    tooltipText={e.node_api_key ?? ""}
                    value={toShortString(e.node_api_key ?? "", 5, 5)}
                  />
                </div>
              </div>
            ))}

          <div className="grid grid-cols-12 justify-evenly gap-3 px-4">
            <Typography variant="heading" className="col-span-6">
              Collator Nodes: <Typography variant="paragraph">4</Typography>
            </Typography>
            <div className="col-span-6 text-right">
              <Button variant="text">View all</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nodes;
