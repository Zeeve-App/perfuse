import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface SidebarDividerProps extends React.ComponentPropsWithRef<"hr"> {}

const SidebarDivider = forwardRef<HTMLHRElement, SidebarDividerProps>((props, ref) => {
  const { className, ...rest } = props;
  return <hr className={tx("border-dark-800", className)} ref={ref} {...rest} />;
});

SidebarDivider.displayName = "SidebarDivider";
export type { SidebarDividerProps };
export { SidebarDivider };
