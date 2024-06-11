import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RemoveProperties } from "../core";
import { tx } from "@/utils/shared";

interface DropdownMenuGroupTitleProps extends RemoveProperties<HTMLMotionProps<"p">, "title"> {}

const DropdownMenuGroupTitle = forwardRef<HTMLParagraphElement, DropdownMenuGroupTitleProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <motion.p
      className={tx("select-none px-3 py-2 font-poppins text-sm font-bold uppercase text-dark-600", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.p>
  );
});

DropdownMenuGroupTitle.displayName = "DropdownMenuGroupTitle";
export type { DropdownMenuGroupTitleProps };
export { DropdownMenuGroupTitle };
