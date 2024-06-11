import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface HeaderLogoContainerProps extends React.ComponentPropsWithRef<"div"> {}

const HeaderLogoContainer = forwardRef<HTMLDivElement, HeaderLogoContainerProps>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={tx("flex h-full items-center justify-start gap-x-2 border-dark-50 px-2 lg:gap-x-4 lg:px-8", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

HeaderLogoContainer.displayName = "HeaderLogoContainer";
export type { HeaderLogoContainerProps };
export { HeaderLogoContainer };
