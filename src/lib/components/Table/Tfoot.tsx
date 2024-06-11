import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TfootProps extends ComponentPropsWithRef<"tfoot"> {}

const Tfoot = forwardRef<HTMLTableSectionElement, TfootProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <tfoot
      className={tx("h-[50px] rounded-e-lg rounded-s-lg bg-brand-light text-brand-dark", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </tfoot>
  );
});

Tfoot.displayName = "Tfoot";
export type { TfootProps };
export { Tfoot };
