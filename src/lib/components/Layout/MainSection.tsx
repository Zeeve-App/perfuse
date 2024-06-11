// import { tx } from "@zeeve-platform/ui";
import React from "react";
import { tx } from "@/utils/shared";

interface LayoutMainSectionProps extends React.ComponentPropsWithRef<"main"> {}

const LayoutMainSection = (props: LayoutMainSectionProps) => {
  const { children, className, ...rest } = props;

  return (
    <main
      className={tx("max-h-full flex-1 overflow-hidden overflow-y-auto bg-brand-light p-3 lg:p-6", className)}
      {...rest}
    >
      {children}
    </main>
  );
};

export { LayoutMainSection };
