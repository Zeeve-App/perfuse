import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { tx } from "@/utils/shared";

interface DropdownMenuDividerProps extends HTMLMotionProps<"hr"> {}

const DropdownMenuDivider = forwardRef<HTMLHRElement, DropdownMenuDividerProps>((props, ref) => {
  const { className, ...rest } = props;
  return <motion.hr className={tx("my-2 border-brand-outline", className)} ref={ref} role="separator" {...rest} />;
});

DropdownMenuDivider.displayName = "DropdownMenuDivider";
export type { DropdownMenuDividerProps };
export { DropdownMenuDivider };
