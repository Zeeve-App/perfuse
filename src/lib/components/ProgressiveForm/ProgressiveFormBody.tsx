import React, { Children, forwardRef, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useProgressiveFormContext } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

interface ProgressiveFormBodyProps extends HTMLMotionProps<"div"> {
  children?: React.ReactElement[] | React.ReactElement;
}

const ProgressiveFormBody = forwardRef<HTMLDivElement, ProgressiveFormBodyProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const { activeStep, setTotalSteps } = useProgressiveFormContext();

  useEffect(() => {
    setTotalSteps(Children.count(children));
  }, [children]);

  return (
    <motion.div className={tx(className)} ref={ref} {...rest}>
      {Children.toArray(children).filter((_, index) => index === activeStep)}
    </motion.div>
  );
});

ProgressiveFormBody.displayName = "ProgressiveFormBody";
export type { ProgressiveFormBodyProps };
export { ProgressiveFormBody };
