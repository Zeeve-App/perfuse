import React, { forwardRef } from "react";
import { IconButton, IconButtonProps } from "../Button";
import { tx } from "@/utils/shared";

interface HeaderMenuButtonProps extends IconButtonProps {}

const HeaderMenuButton = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <IconButton colorScheme="dark" variant="ghost" className={tx("", className)} ref={ref} {...rest}>
      {children}
    </IconButton>
  );
});

HeaderMenuButton.displayName = "HeaderMenuButton";
export type { HeaderMenuButtonProps };
export { HeaderMenuButton };
