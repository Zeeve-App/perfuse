import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TableCaptionProps extends ComponentPropsWithRef<"caption"> {}

const TableCaption = forwardRef<HTMLElement, TableCaptionProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <caption className={tx("caption-top bg-transparent text-start text-brand-gray", className)} ref={ref} {...rest}>
      {children}
    </caption>
  );
});

TableCaption.displayName = "TableCaption";
export type { TableCaptionProps };
export { TableCaption };
