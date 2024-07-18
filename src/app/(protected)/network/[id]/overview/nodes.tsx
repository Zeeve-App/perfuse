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
import { IconButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { ColumnDef, ReactTable, createColumnHelper } from "@/lib/components/ReactTable";
import { NodeDbRow } from "@/db-queries";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";

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
  return (
    <div className="col-span-6 flex flex-col gap-3 rounded-lg p-4 shadow-brand-shadow lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <div className="col-span-6 ">
          <Heading as="h4">Nodes</Heading>
        </div>
        <div className="col-span-6 text-end">
          <IconButton
            size={"large"}
            variant={"text"}
            className="font-semibold"
            isDisabled
            onClick={() => {
              // appendCollator({});
            }}
          >
            Add More Collator <SvgPlusSquare className="pl-2" height={30} width={30} />
          </IconButton>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <Heading as="h5" className="font-medium">
            Recently Deployed
          </Heading>
        </div>
        <div className="col-span-12">
          <ReactTable
            data={
              nodes
                ? nodes.filter((node, index) => {
                    return index < rowPerPage;
                  })
                : []
            }
            columns={nodeTableColumns}
            isLoading={isLoading}
            classNames={{
              table: "table-auto lg:table-fixed",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Nodes;
