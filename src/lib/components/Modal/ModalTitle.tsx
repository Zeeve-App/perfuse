import React, { forwardRef } from "react";
import { Heading } from "../Heading";
import { tx } from "@/utils/shared";

interface ModalTitleProps extends React.ComponentPropsWithRef<"h6"> {}

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Heading as="h6" className={tx("mr-auto break-words text-brand-dark", className)} ref={ref} {...rest}>
      {children}
    </Heading>
  );
});

ModalTitle.displayName = "ModalTitle";
export type { ModalTitleProps };
export { ModalTitle };
