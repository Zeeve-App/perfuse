import React, { forwardRef } from "react";
import { Button, ButtonProps } from "../Button";
import { RemoveProperties } from "../core";
import { tx } from "@/utils/shared";

interface DropdownMenuItemProps extends RemoveProperties<ButtonProps, "isLoading"> {}

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Button
      className={tx(
        "flex w-full cursor-pointer items-center justify-start gap-3 rounded-none bg-transparent px-4 py-2 font-medium text-brand-dark hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white",
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";
export type { DropdownMenuItemProps };
export { DropdownMenuItem };
