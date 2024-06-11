import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface ModalTextProps extends React.ComponentPropsWithRef<"p"> {}

const ModalText = forwardRef<HTMLParagraphElement, ModalTextProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <p className={tx("break-words text-sm text-brand-gray", className)} ref={ref} {...rest}>
      {children}
    </p>
  );
});

ModalText.displayName = "ModalText";
export type { ModalTextProps };
export { ModalText };
