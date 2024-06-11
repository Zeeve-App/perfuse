import React, { cloneElement, forwardRef, Children, useMemo } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { useProgressiveFormContext } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

interface ProgressiveFormHeaderProps extends HTMLMotionProps<"div"> {
  children: React.ReactElement[] | React.ReactElement;
}

const ProgressiveFormHeader = forwardRef<HTMLDivElement, ProgressiveFormHeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { activeStep, isCompact } = useProgressiveFormContext();

  const indexedChildren = useMemo(() => {
    if (isCompact) {
      return Children.map(children, (child, index) => {
        if (index === activeStep)
          return cloneElement(child, {
            componentIndex: index,
            key: index,
          });
      });
    } else {
      return Children.map(children, (child, index) =>
        cloneElement(child, {
          componentIndex: index,
          key: index,
        }),
      );
    }
  }, [activeStep, isCompact, children]);

  return (
    <motion.div
      className={tx("flex flex-row gap-2 overflow-auto border-b border-brand-outline px-2", className)}
      ref={ref}
      {...rest}
    >
      {indexedChildren}
    </motion.div>
  );
});

ProgressiveFormHeader.displayName = "ProgressiveFormHeader";
export type { ProgressiveFormHeaderProps };
export { ProgressiveFormHeader };
