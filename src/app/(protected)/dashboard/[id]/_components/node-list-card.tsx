import React from "react";
import NetworkStatus from "./network-status";
import { NodeTableRowActions } from "./node-table";
import { NodeDbRow } from "@/db-queries";
import { CopyButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import { formatDate, toShortString } from "@/utils/helpers";

const NodeListCard = ({ node }: { node: NodeDbRow }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-theme-foreground shadow-sm dark:border-brand-outline">
      <div className="flex justify-between p-4">
        <div>
          <p className="text-xs font-semibold text-theme-primary">ID</p>
          <Tooltip text={node.node_id} placement="top-start">
            <div className="flex flex-row items-center space-x-2">
              <div className="text-theme-primary-content">{toShortString(node.node_id)}</div>
              <CopyButton text={node.node_id} />
            </div>
          </Tooltip>
        </div>
        <div>
          <p className="text-right text-sm font-medium text-theme-primary">Name</p>
          <p className="text-theme-primary-content">{node.node_name}</p>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div>
          <p className="text-sm font-medium text-theme-primary">Status</p>
          <NetworkStatus />{" "}
        </div>
        <div>
          <p className="text-right text-sm font-medium text-theme-primary">Created On</p>
          <p className="text-theme-primary-content">{formatDate(new Date(node.created_at))}</p>
        </div>
      </div>
      <div className="flex justify-between rounded-b-lg bg-theme-background p-4">
        <p className="font-semibold text-theme-primary-content">Action</p>
        <NodeTableRowActions node={node} />
      </div>
    </div>
  );
};

export default NodeListCard;
