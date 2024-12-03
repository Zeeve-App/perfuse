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
import { formatDate, toShortString } from "@/utils/helpers";
import { useModalStore } from "@/store/modal";
import SvgTrashSquare from "@/lib/icons/essential/outline/TrashSquare";
import SvgChart5Square from "@/lib/icons/business/outline/Chart5Square";
import { IconButton, CopyButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Tooltip } from "@/lib/components/Tooltip";
import { ColumnDef, ReactTable, createColumnHelper } from "@/lib/components/ReactTable";
import { NodeDbRow } from "@/db-queries";
import SvgInfoCircle from "@/lib/icons/essential/outline/InfoCircle";
import { Typography } from "@/lib/components/Typography";
import SvgKey from "@/lib/icons/security/outline/Key";

/** node table action column component */
export const NodeTableRowActions = ({ node }: { node: NodeDbRow }) => {
  const { openModal } = useModalStore();
  const params = useParams();
  return (
    <div className="flex gap-1 lg:flex-row">
      {node.node_type === "collator" && node.node_collator_seed_added !== 1 && (
        <Tooltip text="Add Key" placement="top-start">
          <IconButton
            colorScheme="primary"
            variant={"text"}
            onClick={() => {
              openModal("addKey", {
                addKey: {
                  networkId: params.id as string,
                  nodeId: node.node_id,
                  nodeType: node.node_type,
                  sessionAddress: node.node_collator_session_address ?? "",
                },
              });
            }}
          >
            {/* change */}
            <SvgKey width={24} height={24} color="#CE2CCA" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip text="View Details" placement="top-start">
        <IconButton
          colorScheme="primary"
          variant={"text"}
          onClick={() => {
            openModal("nodeDetails", {
              nodeDetails: {
                networkId: params.id as string,
                nodeId: node.node_id,
                nodeType: node.node_type,
              },
            });
          }}
        >
          <SvgInfoCircle width={24} height={24} color="#CE2CCA" />
        </IconButton>
      </Tooltip>
      <Tooltip text="Analytics" placement="top-start">
        <IconButton variant={"text"} isDisabled={true}>
          <SvgChart5Square width={24} height={24} color="#CE2CCA" />
        </IconButton>
      </Tooltip>
      <Tooltip text="Delete" placement="top-start">
        <IconButton variant={"text"} isDisabled={true}>
          <SvgTrashSquare width={24} height={24} color="#CE2CCA" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

const columnHelper = createColumnHelper<NodeDbRow>();

/** node table columns definition */
const nodeTableColumns: ColumnDef<NodeDbRow, any>[] = [
  columnHelper.accessor("node_id", {
    header: "ID",
    cell: (info) => (
      <Tooltip text={info.getValue()} placement="top-start">
        <div className="flex flex-row items-center space-x-2">
          <Typography variant="paragraph">
            {toShortString(info.getValue())}
            &nbsp;
            <CopyButton className="text-theme-primary-content" text={info.getValue()} />
          </Typography>
        </div>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("node_name", {
    header: "Name",
    cell: (info) => <Typography variant="paragraph">{info.getValue()}</Typography>,
  }),
  columnHelper.accessor("node_id", {
    header: "Status",
    cell: () => <NetworkStatus />,
  }),
  columnHelper.accessor("created_at", {
    header: "Created On",
    cell: (info) => <Typography variant="paragraph">{formatDate(new Date(info.getValue()))}</Typography>,
  }),
  columnHelper.display({
    header: "Actions",
    cell: (info) => <NodeTableRowActions node={info.row.original} />,
  }),
];

/** node table component */
const NodeTable = ({ heading, nodes }: { nodeType: NodeDbRow["node_type"]; heading: string; nodes: NodeDbRow[] }) => {
  // TODO: uncomment when there is more than 4 collator node, for pagination
  // const [{ pageIndex, pageSize }, setPagination] = React.useState({
  //   pageIndex: 1,
  //   pageSize: nodes.length,
  // });

  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-theme-foreground p-6 shadow-lg">
      <Heading as="h5" className="text-lg font-semibold">
        {heading}
      </Heading>
      <div>
        <ReactTable
          data={nodes.map((e) => ({ ...e })) ?? []}
          columns={nodeTableColumns}
          isLoading={false}
          classNames={{
            tableContainer: "w-full border-none",
            thead: {
              thead: "bg-theme-foreground border-b-2 border-brand-outline",
              th: "px-4 py-2 text-left text-theme-primary font-medium text-sm",
            },
            tbody: {
              tbody: "bg-theme-foreground",
              tr: "hover:bg-theme-background",
              td: "px-4 py-3 align-middle border-brand-outline",
            },
          }}
          // TODO: uncomment for pagination
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
