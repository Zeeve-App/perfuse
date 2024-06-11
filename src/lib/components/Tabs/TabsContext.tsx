import { createContext, useContext } from "react";

interface TabsContextProps {
  orientation: "vertical" | "horizontal";
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  /** CSS classes for active tab. */
  activeTabClassName?: string;
}

const TabsContext = createContext<TabsContextProps | null>(null);
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext can only be used within the <Tabs />.");
  }

  return context;
};

const TabsContextConsumer = TabsContext.Consumer;
const TabsContextProvider = TabsContext.Provider;

TabsContext.displayName = "TabsContext";
export type { TabsContextProps };
export { TabsContext, TabsContextConsumer, TabsContextProvider, useTabsContext };
