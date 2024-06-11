import React, { forwardRef } from "react";

interface ModalBodyProps extends React.ComponentPropsWithRef<"div"> {}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>((props, ref) => {
  const { children, className, ...rest } = props;

  function tx(arg0: string, className: string | undefined): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div ref={ref} className={tx("flex flex-row items-start gap-6 p-6", className)} {...rest}>
      {children}
    </div>
  );
});

ModalBody.displayName = "ModalBody";
export type { ModalBodyProps };
export { ModalBody };
