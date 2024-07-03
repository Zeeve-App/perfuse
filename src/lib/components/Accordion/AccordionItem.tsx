import React, { forwardRef, Children, cloneElement, useMemo, useCallback } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

import { RemoveProperties } from "../core";
import { ActiveAccordionContext, ActiveAccordionContextProps } from "./ActiveAccordionContextProvider";
import { useAccordionContext } from "./AccordionContextProvider";

interface AccordionItemProps extends RemoveProperties<HTMLMotionProps<"div">, "children"> {
  isExpanded?: boolean;
  itemIndex?: number;
  children: React.ReactElement | React.ReactElement[];
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const { isExpanded, itemIndex = 0, className, children, ...rest } = props;

  const { activeIndex } = useAccordionContext();

  const _isExpanded = useCallback(() => {
    if (isExpanded !== undefined) return isExpanded;

    if (typeof activeIndex === "number") return activeIndex === itemIndex;
    else return activeIndex.includes(itemIndex);
  }, [isExpanded, activeIndex, itemIndex]);

  const contextValues = useMemo(
    (): ActiveAccordionContextProps => ({
      isExpanded: _isExpanded(),
    }),
    [activeIndex],
  );

  return (
    <ActiveAccordionContext.Provider value={contextValues}>
      <motion.div className={className} ref={ref} {...rest} data-expanded={_isExpanded()}>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            itemIndex,
          });
        })}
      </motion.div>
    </ActiveAccordionContext.Provider>
  );
});

AccordionItem.displayName = "AccordionItem";
export type { AccordionItemProps };
export { AccordionItem };
