import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { ProgressiveFormContextProvider, ProgressiveFormContextProps } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

interface ProgressiveFormProps
  extends HTMLMotionProps<"div">,
    Pick<ProgressiveFormContextProps, "activeStep" | "setActiveStep"> {
  isCompact?: boolean;
  shouldHideHeaderIconsOnCompact?: boolean;
}

const ProgressiveForm = forwardRef<HTMLDivElement, ProgressiveFormProps>((props, ref) => {
  const {
    activeStep = 0,
    setActiveStep,
    isCompact,
    shouldHideHeaderIconsOnCompact,
    className,
    children,
    ...rest
  } = props;

  const [_totalSteps, _setTotalSteps] = useState<number>(0);

  const setTotalSteps = useCallback((count: number) => _setTotalSteps(count), []);

  const values = useMemo(
    (): ProgressiveFormContextProps => ({
      activeStep,
      setActiveStep,
      totalSteps: _totalSteps,
      setTotalSteps,
      isCompact,
      shouldHideHeaderIconsOnCompact,
    }),
    [isCompact, shouldHideHeaderIconsOnCompact, activeStep, _totalSteps],
  );

  return (
    <ProgressiveFormContextProvider value={values}>
      <motion.div className={tx("rounded-lg border border-brand-outline", className)} ref={ref} {...rest}>
        {children}
      </motion.div>
    </ProgressiveFormContextProvider>
  );
});

ProgressiveForm.displayName = "ProgressiveForm";
export type { ProgressiveFormProps };
export { ProgressiveForm };
