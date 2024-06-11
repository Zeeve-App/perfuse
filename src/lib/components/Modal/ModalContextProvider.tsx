import { createContext, useContext } from "react";
import { UseModalReturnType } from "./useModal";

interface ModalContextProps extends UseModalReturnType {}

const ModalContext = createContext<ModalContextProps | null>(null);
ModalContext.displayName = "ModalContext";

const ModalContextConsumer = ModalContext.Consumer;
const ModalContextProvider = ModalContext.Provider;

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within ModalContextProvider");
  }

  return context;
};

export type { ModalContextProps };
export { ModalContext, ModalContextConsumer, useModalContext };
export default ModalContextProvider;
