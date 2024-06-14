import { create } from "zustand";

type registrationInfo = { show: boolean; isLoading: boolean };
type NetworkInfo = {
  data: { networkId: string; relayChainType: string; networkName: string } | undefined;
  isLoading: boolean;
};
// types
type State = {
  networkInfo: NetworkInfo;
  registrationInfo: registrationInfo;
};

type Actions = {
  setNetworkInfo: (networkInfo: NetworkInfo) => void;
  reset: () => void;
  setRegistrationInfo: (registrationInfo: registrationInfo) => void;
};

// initial state
const initialState: State = {
  networkInfo: { data: undefined, isLoading: false },
  registrationInfo: { show: false, isLoading: false },
};

// config store
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
