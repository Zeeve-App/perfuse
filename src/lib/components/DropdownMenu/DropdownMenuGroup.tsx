import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { tx } from "@/utils/shared";

interface DropdownMenuGroupProps extends HTMLMotionProps<"div"> {}

const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.div className={tx("flex flex-col", className)} role="contentinfo" ref={ref} {...rest}>
      {children}
    </motion.div>
  );
});

DropdownMenuGroup.displayName = "DropdownMenuGroup";
export type { DropdownMenuGroupProps };
export { DropdownMenuGroup };
