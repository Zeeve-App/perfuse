import { createContext, useContext } from "react";

interface SideDrawerContextProps {
  placement?: "left" | "right" | "top" | "bottom";
}
const SideDrawerContext = createContext<SideDrawerContextProps | null>(null);
SideDrawerContext.displayName = "SideDrawerContext";

const SideDrawerContextConsumer = SideDrawerContext.Consumer;
const SideDrawerContextProvider = SideDrawerContext.Provider;

const useSideDrawerContext = () => {
  const context = useContext(SideDrawerContext);
  if (!context) {
    throw new Error("useSideDrawerContext must be used within SideDrawerContextProvider");
  }

  return context;
};

export { type SideDrawerContextProps, SideDrawerContext, SideDrawerContextConsumer, useSideDrawerContext };
export default SideDrawerContextProvider;
