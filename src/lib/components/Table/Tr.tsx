import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TrProps extends ComponentPropsWithRef<"tr"> {}

const Tr = forwardRef<HTMLTableRowElement, TrProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <tr className={tx("", className)} ref={ref} {...rest}>
      {children}
    </tr>
  );
});

Tr.displayName = "Tr";
export type { TrProps };
export { Tr };
