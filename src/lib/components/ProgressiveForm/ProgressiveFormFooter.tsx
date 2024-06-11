import React, { ReactNode, forwardRef, useMemo } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RemoveProperties } from "../core";
import { useProgressiveFormContext } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

interface ProgressiveFormFooterProps extends RemoveProperties<HTMLMotionProps<"div">, "children"> {
  children?: (({ isFirst, isLast }: { isFirst: boolean; isLast: boolean }) => ReactNode) | ReactNode;
}

const ProgressiveFormFooter = forwardRef<HTMLDivElement, ProgressiveFormFooterProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { activeStep, totalSteps } = useProgressiveFormContext();

  const isFirst = useMemo(() => activeStep === 0, [activeStep]);
  const isLast = useMemo(() => activeStep === totalSteps - 1, [activeStep, totalSteps]);

  return (
    <motion.div className={tx("border-t border-brand-outline p-4", className)} ref={ref} {...rest}>
      {typeof children === "function" ? children({ isFirst, isLast }) : children}
    </motion.div>
  );
});

ProgressiveFormFooter.displayName = "ProgressiveFormFooter";
export type { ProgressiveFormFooterProps };
export { ProgressiveFormFooter };
