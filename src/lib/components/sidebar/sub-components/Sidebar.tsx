import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { tx } from "@/utils/shared";

interface SidebarProps extends HTMLMotionProps<"aside"> {}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.aside
      className={tx(`flex h-screen min-h-screen w-full select-none flex-col bg-brand-dark text-white`, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.aside>
  );
});

Sidebar.displayName = "Sidebar";
export type { SidebarProps };
export { Sidebar };
