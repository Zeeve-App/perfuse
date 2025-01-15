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
  data:
    | {
        networkId: string;
        relayChainType: string;
        networkName: string;
        networkStatus?: TaskDbRow["task_status"];
        blockHeight: number;
      }
    | undefined;
  isLoading: boolean;
};
/** state of the store */
type State = {
  networkInfo: NetworkInfo;
  registrationInfo: registrationInfo;
};

/** action of the store to change state */
type Actions = {
  setNetworkInfo: (networkInfo: NetworkInfo) => void;
  reset: () => void;
  setRegistrationInfo: (registrationInfo: registrationInfo) => void;
};

/** initial state */
const initialState: State = {
  networkInfo: { data: undefined, isLoading: false },
  registrationInfo: { show: false, isLoading: false },
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
}));

export { useNetworkStore };
