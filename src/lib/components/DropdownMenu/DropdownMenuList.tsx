import React, { forwardRef } from "react";
import ReactFocusLock from "react-focus-lock";
import { AnimatePresence, HTMLMotionProps, Variants, motion } from "framer-motion";
import { Portal } from "../Portal";
import { usePopoverContext } from "../Popover";
import { useMergeRefs } from "@/hooks";
import { tx } from "@/utils/shared";

const motionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface DropdownMenuListProps extends HTMLMotionProps<"div"> {}

const DropdownMenuList = forwardRef<HTMLDivElement, DropdownMenuListProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { isOpen, setPopperElement, styles, attributes } = usePopoverContext();

  const refs = useMergeRefs(ref, setPopperElement);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Portal>
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <ReactFocusLock autoFocus={false}>
            <motion.div
              variants={motionVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              ref={refs}
              className={tx(
                "mt-2 w-max min-w-[148px] rounded-lg border border-brand-outline bg-white py-2 shadow-lg",
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

DropdownMenuList.displayName = "DropdownMenuList";
export type { DropdownMenuListProps };
export { DropdownMenuList };
