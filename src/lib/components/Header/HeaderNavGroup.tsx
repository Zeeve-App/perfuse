import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface HeaderNavGroupProps extends React.ComponentPropsWithRef<"div"> {}

const HeaderNavGroup = forwardRef<HTMLDivElement, HeaderNavGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={tx("flex h-full items-center gap-x-2 px-2 md:gap-x-4 md:px-4 lg:px-8", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

HeaderNavGroup.displayName = "HeaderNavGroup";
export type { HeaderNavGroupProps };
export { HeaderNavGroup };
