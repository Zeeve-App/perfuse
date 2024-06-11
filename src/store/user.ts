import { create } from "zustand";

type User = {
  first_name: string;
  last_name: string;
  usercred: string;
};

// types
type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User | null) => void;
  reset: () => void;
};

// initial state
const initialState: State = {
  user: null,
};

// config store
const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  setUser: (user: User | null) => {
    set({ user });
  },
  reset: () => {
    set(initialState);
  },
}));

export { useUserStore };
