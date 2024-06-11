/* eslint-disable react/display-name */
import { AnimatePresence, HTMLMotionProps, Variants, motion } from "framer-motion";
import React, { Children, cloneElement, forwardRef, useState } from "react";
import { Modifier, usePopper } from "react-popper";
import ReactFocusLock from "react-focus-lock";
import { Placement, PositioningStrategy } from "@popperjs/core";
import { Portal } from "../Portal";
import { useMergeRefs, useToggle } from "@/hooks";
import { tx } from "@/utils/shared";

const motionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface TooltipProps extends HTMLMotionProps<"div"> {
  /** tooltip text */
  text: string;
  /** CSS classes to apply to the `text` */
  textClassName?: string;
  /** tooltip placement */
  placement?: Placement;
  /** tooltip positioning strategy */
  strategy?: PositioningStrategy;
  /** tooltip modifiers */
  modifiers?: Array<Partial<Modifier<string, object>>>;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { children, className, text, textClassName, placement = "auto", strategy, modifiers, ...rest } = props;

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy,
    modifiers,
  });

  const { isOpen, handleOpen, handleClose } = useToggle();

  return (
    <>
      {cloneElement(
        Children.only(children) as React.ReactElement & {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref?: React.Ref<any>;
        },
        {
          ref: useMergeRefs(ref, setReferenceElement),
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        },
      )}
      <AnimatePresence>
        {isOpen ? (
          <Portal>
            <ReactFocusLock>
              <motion.div
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="initial"
                ref={setPopperElement}
                className={tx(
                  "w-max max-w-xs select-none break-words rounded-lg bg-brand-dark/80 p-2 text-sm text-white backdrop-blur md:max-w-md",
                  className,
                )}
                style={styles.popper}
                {...attributes.popper}
                {...rest}
              >
                <p className={tx("leading-[18px]", textClassName)}>{text}</p>
              </motion.div>
            </ReactFocusLock>
          </Portal>
        ) : null}
      </AnimatePresence>
    </>
  );
});

export type { TooltipProps };
export { Tooltip };
