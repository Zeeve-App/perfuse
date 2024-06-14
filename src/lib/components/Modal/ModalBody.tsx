import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

interface ModalBodyProps extends React.ComponentPropsWithRef<"div"> {}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} className={tx("flex flex-row items-start gap-6 p-6", className)} {...rest}>
      {children}
    </div>
  );
});

ModalBody.displayName = "ModalBody";
export type { ModalBodyProps };
export { ModalBody };
