import React, { forwardRef } from "react";
import { Heading } from "../../Heading";
import { tx } from "@/utils/shared";

interface SidebarItemGroupTitleProps extends React.ComponentPropsWithRef<"h6"> {}

const SidebarItemGroupTitle = forwardRef<HTMLHeadingElement, SidebarItemGroupTitleProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Heading
      as="h6"
      className={tx("mb-2 px-5 text-sm font-semibold uppercase leading-5 tracking-wide text-brand-gradient", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Heading>
  );
});

SidebarItemGroupTitle.displayName = "SidebarItemGroupTitle";
export type { SidebarItemGroupTitleProps };
export { SidebarItemGroupTitle };
