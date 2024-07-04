import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface ThProps extends ComponentPropsWithRef<"th"> {}

const Th = forwardRef<HTMLTableCellElement, ThProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <th
      scope="col"
      className={tx("p-4 text-xs font-medium first-of-type:rounded-tl-lg last-of-type:rounded-tr-lg", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </th>
  );
});

Th.displayName = "Th";
export type { ThProps };
export { Th };
