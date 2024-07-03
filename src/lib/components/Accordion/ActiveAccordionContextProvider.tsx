import { createContext, useContext } from "react";

interface ActiveAccordionContextProps {
  isExpanded: boolean;
}

const ActiveAccordionContext = createContext<ActiveAccordionContextProps | null>(null);
ActiveAccordionContext.displayName = "ActiveAccordionContext";

const ActiveAccordionContextConsumer = ActiveAccordionContext.Consumer;
const ActiveAccordionContextProvider = ActiveAccordionContext.Provider;

const useActiveAccordionContext = () => {
  const context = useContext(ActiveAccordionContext);
  if (context === null) {
    throw new Error("useActiveAccordionContext can only be used within the <AccordionItem />.");
  }

  return context;
};

export {
  type ActiveAccordionContextProps,
  ActiveAccordionContext,
  ActiveAccordionContextConsumer,
  useActiveAccordionContext,
};
export default ActiveAccordionContextProvider;
