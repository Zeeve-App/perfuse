import React from "react";
import NetworkStatus from "./network-status";
import { NodeTableRowActions } from "./node-table";
import { NodeDbRow } from "@/db-queries";
import { CopyButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import { formatDate, toShortString } from "@/utils/helpers";

const CollatorNodeCard = ({ node }: { node: NodeDbRow }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-brand-gray shadow-sm">
      <div className="flex justify-between p-4">
        <div>
          <p className="text-xs font-semibold text-gray-500">ID</p>
          <Tooltip text={node.node_id} placement="top-start">
            <div className="flex flex-row items-center space-x-2">
              <div>{toShortString(node.node_id)}</div>
              <CopyButton text={node.node_id} />
            </div>
          </Tooltip>
        </div>
        <div>
          <p className="text-right text-sm font-medium text-gray-600">Name</p>
          <p>{node.node_name}</p>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Status</p>
          <NetworkStatus />{" "}
        </div>
        <div>
          <p className="text-right text-sm font-medium text-gray-600">Created On</p>
          <p>{formatDate(new Date(node.created_at))}</p>
        </div>
      </div>
      <div className="flex justify-between rounded-b-lg border-t bg-theme-foreground p-4">
        <p className="text-sm font-bold text-gray-600">Action</p>
        <NodeTableRowActions node={node} />
      </div>
    </div>
  );
};

export default CollatorNodeCard;
