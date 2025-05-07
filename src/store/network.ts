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
import { TaskDbRow } from "@/db-queries";

/** registration info of parachain */
type registrationInfo = { show: boolean; isLoading: boolean };

/** network info of parachain */
type NetworkInfo = {
  data: {
    networkId: string;
    relayChainType: string;
    networkName: string;
    networkStatus?: TaskDbRow["task_status"];
    blockHeight: number;
    subQueryEnabled: boolean;
    polkadotActive: boolean;
    statescanActive: boolean;
  };
  isLoading: boolean;
};

type NodeInfo = {
  data: {
    apiKey: string;
  };
  isLoading: boolean;
};
/** state of the store */
type State = {
  networkInfo: NetworkInfo;
  registrationInfo: registrationInfo;
  nodeInfo: NodeInfo;
};

/** action of the store to change state */
type Actions = {
  setNetworkInfo: (networkInfo: NetworkInfo) => void;
  reset: () => void;
  setRegistrationInfo: (registrationInfo: registrationInfo) => void;
  setNodeInfo: (nodeInfo: NodeInfo) => void;
};

/** initial state */
const initialNetwork = {
  networkId: "NA",
  relayChainType: "NA",
  networkName: "NA",
  networkStatus: undefined,
  blockHeight: 0,
  subQueryEnabled: false,
  polkadotActive: false,
  statescanActive: false,
};

/** initial state */
const initialNode = {
  apiKey: "",
};

const initialState: State = {
  networkInfo: { data: initialNetwork, isLoading: false },
  registrationInfo: { show: false, isLoading: false },
  nodeInfo: { data: initialNode, isLoading: false },
};

/** network store */
const useNetworkStore = create<State & Actions>((set) => ({
  ...initialState,
  setNetworkInfo: (networkInfo: NetworkInfo) => {
    set({ networkInfo });
  },
  setRegistrationInfo: (registrationInfo: registrationInfo) => {
    set({ registrationInfo });
  },
  reset: () => {
    set(initialState);
  },
  setNodeInfo: (nodeInfo: NodeInfo) => {
    set({ nodeInfo });
  },
}));

export { useNetworkStore };
