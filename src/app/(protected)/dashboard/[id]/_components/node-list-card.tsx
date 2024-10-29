import React from "react";
import NetworkStatus from "./network-status";
import { NodeTableRowActions } from "./node-table";
import { NodeDbRow } from "@/db-queries";
import { CopyButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import { formatDate, toShortString } from "@/utils/helpers";
import KeyValuePair from "@/lib/components/utils/key-value-pair";

const NodeListCard = ({ node }: { node: NodeDbRow }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-brand-gray bg-theme-foreground shadow-sm dark:border-brand-outline">
      <div className="flex justify-between p-4">
        <div>
          <KeyValuePair tooltipText={node.node_id} value={toShortString(node.node_id)} shouldAllowCopy label={"ID"} />
        </div>
        <div>
          <KeyValuePair value={node.node_name} label="Name" className="text-right" />
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div>
          <p className="text-sm font-medium text-theme-primary">Status</p>
          <NetworkStatus />{" "}
        </div>
        <div>
          <KeyValuePair value={formatDate(new Date(node.created_at))} label="Created On" className="text-right" />
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
