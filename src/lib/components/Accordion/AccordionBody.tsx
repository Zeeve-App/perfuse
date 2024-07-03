import React, { forwardRef } from "react";
import { HTMLMotionProps, motion, AnimatePresence } from "framer-motion";

import { useActiveAccordionContext } from "./ActiveAccordionContextProvider";
import { tx } from "@/utils/shared";

interface AccordionBodyProps extends HTMLMotionProps<"div"> {
  itemIndex?: number;
}

const AccordionBody = forwardRef<HTMLDivElement, AccordionBodyProps>((props, ref) => {
  const { className, itemIndex = 0, children, ...rest } = props;

  const { isExpanded } = useActiveAccordionContext();

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          className={tx("text-sm font-normal", className)}
          id={`accordion-${itemIndex}-content`}
          role="region"
          aria-labelledby={`accordion-${itemIndex}-header`}
          ref={ref}
          variants={{
            animate: { opacity: 1, height: "auto" },
            initial: { opacity: 0, height: 0 },
          }}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={{ duration: 0.3 }}
          {...rest}
          data-expanded={isExpanded}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

AccordionBody.displayName = "AccordionBody";
export { type AccordionBodyProps };
export { AccordionBody };
