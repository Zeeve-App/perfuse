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
