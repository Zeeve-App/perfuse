import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface HeaderProps extends React.ComponentPropsWithRef<"header"> {}

const Header = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <header
      className={tx("flex h-20 w-full items-center justify-between border-b bg-white", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </header>
  );
});

Header.displayName = "Header";
export type { HeaderProps };
export { Header };
