"use client";
import React, { forwardRef, useState } from "react";
// import { IconCopy, IconCopyCheck } from "@zeeve-platform/icons/design-tool/outline";
import { RemoveProperties } from "../core";
import { Tooltip } from "../Tooltip";
import { IconButton, IconButtonProps } from "./IconButton";
import { tx } from "@/utils/shared";
import SvgCopy from "@/lib/icons/design-tool/outline/Copy";
import SvgCopyCheck from "@/lib/icons/design-tool/outline/CopyCheck";

interface CopyButtonProps extends RemoveProperties<IconButtonProps, "children" | "size"> {
  text: string;
}

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>((props, ref) => {
  const { text, className, ...rest } = props;

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      setIsCopied(false);
    }
  };

  return (
    <Tooltip text={!isCopied ? "Copy" : "Copied"} placement="bottom-start">
      <IconButton
        variant="text"
        className={tx("rounded-md text-xl text-brand-primary focus:ring-offset-0", className, {
          "text-green-500": isCopied,
        })}
        onClick={handleCopyButtonClick}
        ref={ref}
        {...rest}
      >
        {!isCopied ? <SvgCopy className="size-6" /> : <SvgCopyCheck className="size-5" />}
      </IconButton>
    </Tooltip>
  );
});

CopyButton.displayName = "CopyButton";
export type { CopyButtonProps };
export { CopyButton };
