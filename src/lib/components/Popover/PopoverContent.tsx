/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import ReactFocusLock from "react-focus-lock";
import { AnimatePresence, HTMLMotionProps, Variants, motion } from "framer-motion";
// eslint-disable-next-line import/no-unresolved
import { ReactFocusLockProps } from "react-focus-lock/interfaces";
import { Portal } from "../Portal";
import { usePopoverContext } from "./PopoverContext";
import { tx } from "@/utils/shared";
import { useMergeRefs } from "@/hooks";

const motionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface PopoverContentProps extends HTMLMotionProps<"div"> {
  focusLockProps?: ReactFocusLockProps;
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const { children, className, focusLockProps, ...rest } = props;

  const { isOpen, setPopperElement, styles, attributes } = usePopoverContext();

  const refs = useMergeRefs(ref, setPopperElement);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Portal>
          <ReactFocusLock {...focusLockProps}>
            <motion.div
              variants={motionVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              ref={refs}
              className={tx(
                "w-max max-w-sm rounded-lg border border-brand-outline bg-brand-dark/80 p-3 text-white backdrop-blur",
                className,
              )}
              style={styles.popper}
              {...attributes.popper}
              {...rest}
            >
              {children}
            </motion.div>
          </ReactFocusLock>
        </Portal>
      ) : null}
    </AnimatePresence>
  );
});

export type { PopoverContentProps };
export { PopoverContent };
