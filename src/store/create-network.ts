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
import { ConfigureNetworkSchemaType } from "@/app/create/_components/form-steps/step-1-configure-network";
import { ConfigureRelayChainSchemaType } from "@/app/create/_components/form-steps/step-2-configure-relay-chain";

// you can add additional type properties here for each step
type ConfigureNetwork = ConfigureNetworkSchemaType;
type ConfigureRelayChain = ConfigureRelayChainSchemaType;

type CreateNetworkForm =
  | { step: "configureNetwork"; data: ConfigureNetwork }
  | {
      step: "configureRelayChain";
      data: ConfigureRelayChain;
    };

type State = {
  chainSpecFile: File | null;
  isBinaryFileUploading: boolean;
  binaryFile: File | null;
  globalNetworkId: string | null;
  configureNetwork: ConfigureNetwork | null;
  configureRelayChain: ConfigureRelayChain | null;
};

const initialState: State = {
  chainSpecFile: null,
  isBinaryFileUploading: false,
  binaryFile: null,
  globalNetworkId: null,
  configureNetwork: null,
  configureRelayChain: null,
};

type Actions = {
  setChainSpecFile: (file: File | null) => void;
  setIsBinaryFileUploading: (value: boolean) => void;
  setBinaryFile: (file: File | null) => void;
  setGlobalNetworkId: (value: string | null) => void;
  setFormData: ({ step, data }: CreateNetworkForm) => void;
  reset: () => void;
};

const useCreateNetworkFormStore = create<State & Actions>((set) => ({
  ...initialState,
  setChainSpecFile: (file) => {
    set({ chainSpecFile: file });
  },
  setIsBinaryFileUploading: (value) => {
    set({ isBinaryFileUploading: value });
  },
  setBinaryFile: (file) => {
    set({ binaryFile: file });
  },
  setGlobalNetworkId: (value) => {
    set({ globalNetworkId: value });
  },
  setFormData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [step]: data,
    })),
  reset: () => {
    set(initialState);
  },
}));

export { useCreateNetworkFormStore };
