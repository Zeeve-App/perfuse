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

import { create } from "zustand";
import { NODE_TYPE } from "@/types/node";

type NodesCount = {
  bootnode: number;
  validator: number;
  rpc: number;
};

// types
type State = {
  nodesCount: NodesCount;
};

type Actions = {
  setNodesCount: (nodesCount: NodesCount) => void;
  setNodeCount: (nodeType: NODE_TYPE, nodeCount: number) => void;
  resetNodesCount: () => void;
};

// initial state
const initialState: State = {
  nodesCount: { bootnode: 0, validator: 0, rpc: 0 },
};

// node store
const useNodeStore = create<State & Actions>((set) => ({
  ...initialState,
  setNodesCount: (nodesCount: NodesCount) => {
    set({ nodesCount });
  },
  setNodeCount: (nodeType: NODE_TYPE, nodeCount: number) => {
    set((prevState) => {
      return { nodesCount: { ...prevState.nodesCount, [nodeType]: nodeCount } };
    });
  },
  resetNodesCount: () => {
    set(initialState);
  },
}));

export { useNodeStore };
