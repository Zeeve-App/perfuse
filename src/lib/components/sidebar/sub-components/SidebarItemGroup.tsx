import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { tx } from "@/utils/shared";

interface SidebarItemGroupProps extends HTMLMotionProps<"div"> {}

const SidebarItemGroup = forwardRef<HTMLDivElement, SidebarItemGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.div className={tx("flex flex-col py-6", className)} ref={ref} {...rest}>
      {children}
    </motion.div>
  );
});

SidebarItemGroup.displayName = "SidebarItemGroup";
export type { SidebarItemGroupProps };
export { SidebarItemGroup };
