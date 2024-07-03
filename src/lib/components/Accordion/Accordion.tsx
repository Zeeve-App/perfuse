import React, { Children, cloneElement, forwardRef, useMemo, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

import { RemoveProperties } from "../core";
import AccordionContextProvider, { AccordionContextProps } from "./AccordionContextProvider";
import { tx } from "@/utils/shared";

interface AccordionProps
  extends RemoveProperties<HTMLMotionProps<"div">, "children">,
    RemoveProperties<AccordionContextProps, "activeIndex" | "setActiveIndex"> {
  children: React.ReactElement | React.ReactElement[];
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { className, children, shouldAllowMultiple, ...rest } = props;

  const [_activeIndex, _setActiveIndex] = useState<number | number[]>(-1);

  const contextValues = useMemo(
    (): AccordionContextProps => ({
      activeIndex: _activeIndex,
      setActiveIndex: _setActiveIndex,
      shouldAllowMultiple,
    }),
    [shouldAllowMultiple, _activeIndex],
  );

  return (
    <AccordionContextProvider value={contextValues}>
      <motion.div className={tx("divide-y overflow-hidden rounded-lg ", className)} ref={ref} {...rest}>
        {Children.map(children, (child, index) => {
          return cloneElement(child, {
            itemIndex: index,
          });
        })}
      </motion.div>
    </AccordionContextProvider>
  );
});

Accordion.displayName = "Accordion";
export type { AccordionProps };
export { Accordion };
