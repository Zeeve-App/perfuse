import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface TdProps extends ComponentPropsWithRef<"td"> {}

const Td = forwardRef<HTMLTableCellElement, TdProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <td
      className={tx(
        "p-4 text-xs font-medium text-brand-gray first-of-type:rounded-bl-lg last-of-type:rounded-br-lg",
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </td>
  );
});

Td.displayName = "Td";
export type { TdProps };
export { Td };
