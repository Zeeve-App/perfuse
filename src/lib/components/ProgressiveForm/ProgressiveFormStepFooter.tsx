/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface ProgressiveFormStepFooterProps extends React.ComponentPropsWithRef<"div"> {}

const ProgressiveFormStepFooter = forwardRef<HTMLDivElement, ProgressiveFormStepFooterProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div className={tx("flex w-full items-center justify-end gap-4 px-6 py-4", className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

export type { ProgressiveFormStepFooterProps };
export { ProgressiveFormStepFooter };
