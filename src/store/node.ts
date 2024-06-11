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
