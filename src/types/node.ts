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

type NodeNetworkStates = "requested" | "provisioning" | "ready" | "deleting" | "deleted" | "failed" | "updating";
type NODE_TYPE = "rpc" | "collator";
type CREDENTIALS_TYPE = "basic_auth" | "api_key";
type Node = {
  nodeId: string;
  nodeName: string;
  nodeType: NODE_TYPE;
  nodeRegion: string;
  nodeStatus: NodeNetworkStates;
  nodeCreatedAt: Date;
};

export type { NodeNetworkStates, NODE_TYPE, Node, CREDENTIALS_TYPE };
