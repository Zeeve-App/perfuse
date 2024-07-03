/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface LabelProps extends React.ComponentPropsWithRef<"label"> {
  isRequired?: boolean;
  isDisabled?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { children, className, isRequired, isDisabled, ...rest } = props;

  return (
    <label
      className={tx(
        "inline-flex items-center font-poppins text-base tracking-[0.1px] text-brand-dark",
        { "after:text-brand-red after:content-['*']": isRequired },
        className,
        { "cursor-not-allowed opacity-50": isDisabled },
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </label>
  );
});

export type { LabelProps };
export { Label };
