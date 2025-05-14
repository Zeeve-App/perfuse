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
import { NodeDbRow } from "@/db-queries";
import { isSelected } from "@/constants/create-network";
import { ReCreatePerfuseApiPayload } from "@/app/(protected)/api/re-create/route";

/** modal types, based on the type modal will be visible */
type ModalType =
  | "purchase"
  | "deleteNetwork"
  | "registerParachain"
  | "nodeDetails"
  | "addKey"
  | "explorers"
  | "deploySubquery"
  | "reDeployNetwork";

/** modal data for each modal type */
type ModalData = {
  purchase?: {
    url: string;
  };
  deleteNetwork?: {
    networkName: string;
    networkId: string;
  };
  reDeployNetwork?: { payLoad: ReCreatePerfuseApiPayload };
  registerParachain?: {
    networkId: string;
  };
  nodeDetails?: {
    nodeId: string;
    networkId: string;
    nodeType: NodeDbRow["node_type"];
  };
  addKey?: {
    nodeId: string;
    networkId: string;
    nodeType: NodeDbRow["node_type"];
    sessionAddress: string;
  };
  explorers?: {
    polkadotLink: string;
    stateScanLink: string;
    traceHawkLink: string;
    isSelected: isSelected;
  };
  deploySubquery?: {
    networkId: string;
  };
};

/** state of the modal */
type State = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
};

/** action to update the state/modal */
type Actions = {
  openModal: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  setModalData: (type: ModalType, data: ModalData) => void;
};

/**  initial state */
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
