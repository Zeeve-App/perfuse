import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TbodyProps extends ComponentPropsWithRef<"tbody"> {}

const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <tbody className={tx("h-[62px] rounded-lg bg-white text-brand-dark", className)} ref={ref} {...rest}>
      {children}
    </tbody>
  );
});

Tbody.displayName = "Tbody";
export type { TbodyProps };
export { Tbody };
