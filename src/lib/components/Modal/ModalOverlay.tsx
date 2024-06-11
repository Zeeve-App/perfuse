import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { tx } from "@/utils/shared";

type ModalOverlayProps = HTMLMotionProps<"div">;

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      tabIndex={-1}
      aria-hidden="true"
      className={tx("fixed inset-0 bg-black/40", className)}
      ref={ref}
      {...rest}
    />
  );
});

ModalOverlay.displayName = "ModalOverlay";
export type { ModalOverlayProps };
export { ModalOverlay };
