"use client";
import { Heading, IconButton, Tooltip, useTabsContext } from "@zeeve-platform/ui";
import React from "react";
import { ReactTable, createColumnHelper, ColumnDef } from "@zeeve-platform/ui-common-components";
import { useParams } from "next/navigation";
import { IconArrowUpRightFromSquare } from "@zeeve-platform/icons/arrow/outline";
import NetworkNodeStatus from "@/components/network-node-status";
import CardKeyValuePair from "@/components/card-key-value-pair";
import { NetworkRecentNode } from "@/services/parachains/network/network-overview-details";
import useParachainsService from "@/services/parachains/use-parachains-service";

const columnHelper = createColumnHelper<Node>();
type Node = NetworkRecentNode;
// table columns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTableColumns: ColumnDef<NetworkRecentNode, any>[] = [
  columnHelper.accessor("nodeName", {
    header: "Name",
    cell: (info) => info.getValue(), // just an example to style a column/cell
  }),
  columnHelper.accessor("nodeType", {
    header: "Type",
    cell: (info) => info.getValue().toUpperCase(),
  }),
  columnHelper.accessor("nodeStatus", {
    header: "Status",
    cell: (info) => <NetworkNodeStatus status={info.getValue()} />,
  }),
];

const Nodes = () => {
  const params = useParams();
  const networkId = params.id as string;
  const {
    request: { data, isLoading },
  } = useParachainsService().network.overviewDetails(networkId);
  const rowPerPage = 3;
  const { setActiveIndex } = useTabsContext();
  return (
    <div className="col-span-12 flex flex-col overflow-hidden rounded-lg border border-brand-outline xl:col-span-6 2xl:col-span-6">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Heading as="h4">Nodes</Heading>
          <Tooltip text={"My Nodes"} placement="top-start">
            <IconButton colorScheme="primary" variant={"ghost"} onClick={() => setActiveIndex(2)} size={"small"}>
              <IconArrowUpRightFromSquare className="text-xl" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 p-2">
        <div className="col-span-12 lg:col-span-4">
          <div className="grid grid-cols-12 gap-3 p-2">
            <div className="col-span-12 lg:col-span-12">
              <CardKeyValuePair
                label={"Collator Nodes"}
                value={data?.data.nodeCount.collator}
                className="lg:p-4"
                isLoading={isLoading}
              />
            </div>
            <div className="col-span-12 lg:col-span-12">
              <CardKeyValuePair
                label={"RPC Nodes"}
                value={data?.data.nodeCount.rpc}
                className="lg:p-4"
                isLoading={isLoading}
              />
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
                data?.data.recentNodes
                  ? data.data.recentNodes.filter((node, index) => {
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
