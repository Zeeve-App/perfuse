import { createContext, useCallback, useContext } from "react";

interface AccordionContextProps {
  activeIndex: number | number[];
  setActiveIndex: (idx: number | number[] | ((prevState: number | number[]) => number | number[])) => void;
  shouldAllowMultiple?: boolean;
}

const AccordionContext = createContext<AccordionContextProps | null>(null);
AccordionContext.displayName = "AccordionContext";

const AccordionContextConsumer = AccordionContext.Consumer;
const AccordionContextProvider = AccordionContext.Provider;

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (context === null) {
    throw new Error("useAccordionContext can only be used within the <Accordion />.");
  }

  const { activeIndex, setActiveIndex, shouldAllowMultiple } = context;

  const toggleAccordion = useCallback(
    (index: number) => {
      if (!shouldAllowMultiple) {
        if (typeof activeIndex === "object") {
          setActiveIndex(index);
        } else {
          if (activeIndex === index) {
            setActiveIndex(-1);
          } else {
            setActiveIndex(index);
          }
        }
      } else {
        if (typeof activeIndex === "number") {
          setActiveIndex([index]);
        } else {
          if (!activeIndex.includes(index)) {
            setActiveIndex([...activeIndex, index]);
          } else {
            setActiveIndex(activeIndex.filter((idx) => idx !== index));
          }
        }
      }
    },
    [shouldAllowMultiple, activeIndex, setActiveIndex],
  );

  return { ...context, toggleAccordion };
};

export { type AccordionContextProps, AccordionContext, AccordionContextConsumer, useAccordionContext };
export default AccordionContextProvider;
