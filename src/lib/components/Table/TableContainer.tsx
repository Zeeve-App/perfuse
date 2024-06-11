import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TableContainerProps extends ComponentPropsWithRef<"div"> {}

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={tx("block max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

TableContainer.displayName = "TableContainer";
export type { TableContainerProps };
export { TableContainer };
