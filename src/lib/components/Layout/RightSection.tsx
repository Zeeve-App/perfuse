import React from "react";
import { tx } from "@/utils/shared";

interface LayoutRightSectionProps extends React.ComponentPropsWithRef<"div"> {}

const LayoutRightSection = (props: LayoutRightSectionProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={tx("flex h-full flex-1 flex-col overflow-hidden", className)} {...rest}>
      {children}
    </div>
  );
};

export { LayoutRightSection };
