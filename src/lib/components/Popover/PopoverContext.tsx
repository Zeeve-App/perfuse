import { createContext, useContext } from "react";

interface PopoverContextProps {
  isOpen: boolean;
  setReferenceElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setPopperElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  styles: {
    [key: string]: React.CSSProperties;
  };
  attributes: {
    [key: string]:
      | {
          [key: string]: string;
        }
      | undefined;
  };
}

const PopoverContext = createContext<PopoverContextProps | null>(null);
const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopoverContext must be used within <Popover />");
  }

  return context;
};

const PopoverContextConsumer = PopoverContext.Consumer;
const PopoverContextProvider = PopoverContext.Provider;

PopoverContext.displayName = "PopoverContext";
export type { PopoverContextProps };
export { PopoverContext, PopoverContextConsumer, PopoverContextProvider, usePopoverContext };
