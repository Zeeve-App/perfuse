import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

const styles = cva("flex items-center gap-4 px-6 py-4", {
  variants: {
    placement: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    placement: "end",
  },
});

type ModalFooterVariantProps = VariantProps<typeof styles>;

interface ModalFooterProps extends React.ComponentPropsWithRef<"div">, ModalFooterVariantProps {}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>((props, ref) => {
  const { placement, className, children, ...rest } = props;

  return (
    <div ref={ref} className={tx(styles({ placement, className }))} {...rest}>
      {children}
    </div>
  );
});

ModalFooter.displayName = "ModalFooter";
export type { ModalFooterProps };
export { ModalFooter };
