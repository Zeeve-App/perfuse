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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import NetworkStatus from "./network-status";
import { NODE_TYPE } from "@/types/node";
import { formatDate, toShortString } from "@/utils/helpers";
import { useModalStore } from "@/store/modal";
import SvgTrashSquare from "@/lib/icons/essential/outline/TrashSquare";
import SvgChart5Square from "@/lib/icons/business/outline/Chart5Square";
import { IconButton, CopyButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Tooltip } from "@/lib/components/Tooltip";
import { ColumnDef, ReactTable, Row, createColumnHelper } from "@/lib/components/ReactTable";
import { NodeDbRow } from "@/db-queries";
import SvgInfoCircle from "@/lib/icons/essential/outline/InfoCircle";

const NodeTableRowActions = ({ row }: { row: Row<NodeDbRow> }) => {
  const { openModal } = useModalStore();
  const params = useParams();
  return (
    <div className="flex gap-4 lg:flex-row">
      <Tooltip text="View Details" placement="top-start">
        <IconButton
          colorScheme="primary"
          variant={"text"}
          onClick={() => {
            openModal("nodeDetails", {
              nodeDetails: {
                networkId: params.id as string,
                nodeId: row.original.node_id,
                nodeType: row.original.node_type,
              },
            });
          }}
        >
          <SvgInfoCircle width={24} height={24} color="#1B2559" />
        </IconButton>
      </Tooltip>
      <Tooltip text="Analytics" placement="top-start">
        <IconButton variant={"text"} isDisabled={true}>
          <SvgChart5Square width={24} height={24} color="#1B2559" />
        </IconButton>
      </Tooltip>
      <Tooltip text="Delete" placement="top-start">
        <IconButton variant={"text"} isDisabled={true}>
          <SvgTrashSquare width={24} height={24} color="#1B2559" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

const columnHelper = createColumnHelper<NodeDbRow>();

const nodeTableColumns: ColumnDef<NodeDbRow, any>[] = [
  columnHelper.accessor("node_id", {
    header: "ID",
    cell: (info) => (
      <Tooltip text={info.getValue()} placement="top-start">
        <div className="flex items-center">
          <div className="mr-2">{toShortString(info.getValue())}</div>
          <CopyButton text={info.getValue()} />
        </div>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("node_name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("node_id", {
    header: "Status",
    cell: (_info) => <NetworkStatus />,
  }),
  columnHelper.accessor("created_at", {
    header: "Created On",
    cell: (info) => formatDate(new Date(info.getValue())),
  }),
  columnHelper.display({
    header: "Actions",
    cell: (info) => <NodeTableRowActions row={info.row} />,
  }),
];

const NodeTable = ({ heading, nodes }: { nodeType: NODE_TYPE; heading: string; nodes: NodeDbRow[] }) => {
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 1,
    pageSize: nodes.length,
  });

  return (
    <div className="flex flex-col gap-2 overflow-hidden p-4 lg:gap-4">
      <Heading as="h5">
        {heading} ({pageSize})
      </Heading>
      <div>
        <ReactTable
          data={nodes.map((e) => ({ ...e })) ?? []}
          columns={nodeTableColumns}
          isLoading={false}
          // pagination={{
          //   pageCount: nodes.length,
          //   pageIndex: pageIndex,
          //   pageSize: pageSize,
          //   pageSizes: [3, 5, 10, 20, 50],
          //   setPagination: setPagination,
          // }}
        />
      </div>
    </div>
  );
};

export default NodeTable;
