import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TableProps extends ComponentPropsWithRef<"table"> {}

const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <table
      className={tx(
        "w-full table-auto border-separate rounded-lg border border-brand-outline text-left text-sm text-gray-500",
        className,
      )}
      ref={ref}
      role="table"
      {...rest}
    >
      {children}
    </table>
  );
});

Table.displayName = "Table";
export type { TableProps };
export { Table };
