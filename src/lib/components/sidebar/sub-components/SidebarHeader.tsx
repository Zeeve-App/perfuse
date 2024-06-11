import React, { ComponentPropsWithRef, forwardRef } from "react";
import { tx } from "@/utils/shared";
// import { tx } from "../../utilities/shared";

interface SidebarHeaderProps extends ComponentPropsWithRef<"div"> {}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={tx("flex h-20 flex-row items-center justify-between border-b border-dark-800 p-4", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

SidebarHeader.displayName = "SidebarHeader";
export type { SidebarHeaderProps };
export { SidebarHeader };
