import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface HeaderDividerProps extends React.ComponentPropsWithRef<"div"> {}

const HeaderDivider = forwardRef<HTMLDivElement, HeaderDividerProps>((props, ref) => {
  const { className, ...rest } = props;
  return <div className={tx("h-10 border-l border-dark-50", className)} ref={ref} {...rest} />;
});

HeaderDivider.displayName = "HeaderDivider";
export type { HeaderDividerProps };
export { HeaderDivider };
