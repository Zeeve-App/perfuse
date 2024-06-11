import React, { forwardRef } from "react";
import { RemoveProperties } from "../core";
import { IconButton, IconButtonProps } from "./IconButton";
import { tx } from "@/utils/shared";
import SvgXMark from "@/lib/icons/essential/outline/XMark";

type CloseButtonProps = RemoveProperties<IconButtonProps, "children" | "size" | "isLoading">;

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <IconButton
      variant="text"
      colorScheme="dark"
      className={tx("rounded-md border-current", className)}
      aria-label="Close"
      ref={ref}
      {...rest}
    >
      {<SvgXMark />}
    </IconButton>
  );
});

CloseButton.displayName = "CloseButton";
export type { CloseButtonProps };
export { CloseButton };
