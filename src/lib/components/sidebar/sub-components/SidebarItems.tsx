import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";

interface SidebarItemsProps extends ComponentPropsWithRef<"div"> {}

const SidebarItems = forwardRef<HTMLDivElement, SidebarItemsProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div className={tx("flex flex-col overflow-y-scroll scrollbar-hide", className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

SidebarItems.displayName = "SidebarItems";
export type { SidebarItemsProps };
export { SidebarItems };
