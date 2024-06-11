import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface SideDrawerBodyProps extends React.ComponentPropsWithRef<"div"> {}

const SideDrawerBody = forwardRef<HTMLDivElement, SideDrawerBodyProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div className={tx("px-4 py-2", className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

SideDrawerBody.displayName = "SideDrawerBody";
export type { SideDrawerBodyProps };
export { SideDrawerBody };
