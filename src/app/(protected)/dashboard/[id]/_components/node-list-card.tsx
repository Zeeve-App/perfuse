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
import NetworkStatus from "./network-status";
import { NodeTableRowActions } from "./node-table";
import { NodeDbRow } from "@/db-queries";
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
