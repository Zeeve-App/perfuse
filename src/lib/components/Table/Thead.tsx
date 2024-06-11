import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TheadProps extends ComponentPropsWithRef<"thead"> {}

const Thead = forwardRef<HTMLTableSectionElement, TheadProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <thead
      className={tx("h-[50px] rounded-e-lg rounded-s-lg bg-brand-light text-brand-dark", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </thead>
  );
});

Thead.displayName = "Thead";
export type { TheadProps };
export { Thead };
