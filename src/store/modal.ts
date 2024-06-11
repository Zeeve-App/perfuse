import { create } from "zustand";
import { NODE_TYPE } from "@/types/node";

// types
type ModalType = "purchase" | "deleteNetwork" | "registerParachain" | "nodeDetails";

type ModalData = {
  purchase?: {
    url: string;
  };
  deleteNetwork?: {
    networkName: string;
    networkId: string;
  };
  registerParachain?: {
    networkId: string;
  };
  nodeDetails?: {
    nodeId: string;
    networkId: string;
    nodeType: NODE_TYPE;
  };
};

type State = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
};

// actions
type Actions = {
  openModal: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  setModalData: (type: ModalType, data: ModalData) => void;
};

// initial state
const initialState: State = {
  type: null,
  data: {},
  isOpen: false,
};

/** hook to use modal store */
const useModalStore = create<State & Actions>((set) => ({
  ...initialState,
  openModal: (type, data = {}) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => {
    set({ isOpen: false, type: null, data: {} });
  },
  setModalData: (type, data) => {
    set({ type, data });
  },
}));

export { useModalStore };
