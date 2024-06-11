import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface HeaderNavContainerProps extends React.ComponentPropsWithRef<"div"> {}

const HeaderNavContainer = forwardRef<HTMLDivElement, HeaderNavContainerProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div className={tx("flex h-full flex-row items-center", className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

HeaderNavContainer.displayName = "HeaderNavContainer";
export type { HeaderNavContainerProps };
export { HeaderNavContainer };
