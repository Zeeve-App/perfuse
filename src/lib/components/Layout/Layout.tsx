import React from "react";
import { tx } from "@/utils/shared";

interface LayoutProps extends React.ComponentPropsWithRef<"div"> {}

const Layout = (props: LayoutProps) => {
  const { className, children, ...rest } = props;

  return (
    <div className={tx("flex h-screen overflow-y-hidden", className)} {...rest}>
      {children}
    </div>
  );
};

export { Layout };
