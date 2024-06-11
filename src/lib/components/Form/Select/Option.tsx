import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { tx } from "@/utils/shared";

interface OptionProps extends HTMLMotionProps<"option"> {}

const Option = forwardRef<HTMLOptionElement, OptionProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.option
      className={tx("bg-white px-6 py-2 font-medium leading-5 text-brand-dark", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </motion.option>
  );
});

Option.displayName = "Option";
export type { OptionProps };
export { Option };
