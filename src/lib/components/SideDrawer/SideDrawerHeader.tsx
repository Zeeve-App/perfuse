import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface SideDrawerHeaderProps extends React.ComponentPropsWithRef<"div"> {}

const SideDrawerHeader = forwardRef<HTMLDivElement, SideDrawerHeaderProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={tx("sticky top-0 flex h-20 w-full items-center justify-between border-b bg-white p-6", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

SideDrawerHeader.displayName = "SideDrawerHeader";
export type { SideDrawerHeaderProps };
export { SideDrawerHeader };
