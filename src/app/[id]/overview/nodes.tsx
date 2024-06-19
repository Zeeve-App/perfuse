"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IconButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { ColumnDef, ReactTable, createColumnHelper } from "@/lib/components/ReactTable";
import { Tooltip } from "@/lib/components/Tooltip";
import CardKeyValuePair from "@/lib/components/utils/card-key-value-pair";
import SvgArrowUpRightFromSquare from "@/lib/icons/arrows/outline/ArrowUpRightFromSquare";
import { NodeDbRow } from "@/db-queries";

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
  // columnHelper.accessor("nodeStatus", {
  //   header: "Status",
  //   cell: (info) => <NetworkNodeStatus status={info.getValue()} />,
  // }),
];

const Nodes = ({ isLoading, nodes }: { isLoading: boolean; nodes: NodeDbRow[] }) => {
  const params = useParams();
  const networkId = params.id;
  const rowPerPage = 3;
  return (
    <div className="col-span-12 flex flex-col overflow-hidden rounded-lg border border-brand-outline xl:col-span-6 2xl:col-span-5">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Heading as="h4">Nodes</Heading>
          <Link href={`/${networkId}/my-nodes`}>
            <Tooltip text={"My Nodes"} placement="top-start">
              <IconButton colorScheme="primary" variant={"ghost"} size={"small"}>
                <SvgArrowUpRightFromSquare className="text-xl" />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 p-2">
        <div className="col-span-12 lg:col-span-4">
          <div className="grid grid-cols-12 gap-3 p-2">
            <div className="col-span-12 lg:col-span-12">
              <CardKeyValuePair label={"Collator Nodes"} value={2} className="lg:p-4" isLoading={isLoading} />
            </div>
            <div className="col-span-12 lg:col-span-12">
              <CardKeyValuePair label={"RPC Nodes"} value={1} className="lg:p-4" isLoading={isLoading} />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="p-2">
            <Heading as="h6" className="mb-3">
              Recently Deployed
            </Heading>
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
    </div>
  );
};

export default Nodes;
