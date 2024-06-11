import { cva } from "class-variance-authority";
import React, { forwardRef, useEffect, useMemo } from "react";
import ReactFocusLock from "react-focus-lock";
// eslint-disable-next-line import/no-unresolved
import { ReactFocusLockProps } from "react-focus-lock/interfaces";
import { HTMLMotionProps, Variants, motion } from "framer-motion";
import { useModalContext } from "../Modal/ModalContextProvider";
import { useSideDrawerContext } from "./SideDrawerContextProvider";
import { tx } from "@/utils/shared";

const styles = cva("absolute size-full overflow-y-auto bg-white transition-all duration-500 ease-out", {
  variants: {
    placement: {
      left: "inset-y-0 left-0 md:w-96",
      right: "inset-y-0 right-0 md:w-96",
      top: "inset-x-0 top-0 md:h-52",
      bottom: "inset-x-0 bottom-0 md:h-52",
    },
  },
});

interface SideDrawerContainerProps extends React.ComponentPropsWithRef<"div"> {}
interface SideDrawerContentProps extends HTMLMotionProps<"div"> {
  sideDrawerContainerProps?: SideDrawerContainerProps;
  focusLockProps?: ReactFocusLockProps;
}

const SideDrawerContent = forwardRef<HTMLDivElement, SideDrawerContentProps>((props, ref) => {
  const { children, className, sideDrawerContainerProps, focusLockProps, ...rest } = props;
  const { placement } = useSideDrawerContext();
  const { setIsModalMounted: setIsSideDrawerMounted, getModalProps: getSideDrawerProps } = useModalContext();
  const sideDrawerProps = getSideDrawerProps(rest, ref);

  useEffect(() => {
    setIsSideDrawerMounted(true);
    return () => setIsSideDrawerMounted(false);
  }, [setIsSideDrawerMounted]);

  // animation based on drawer placement
  const motionVariants: Variants = useMemo(() => {
    switch (placement) {
      case "left": {
        return {
          initial: {
            x: "-100%",
          },
          animate: {
            x: 0,
          },
        };
      }
      case "top": {
        return {
          initial: {
            y: "-100%",
          },
          animate: {
            y: 0,
          },
        };
      }
      case "bottom": {
        return {
          initial: {
            y: "100%",
          },
          animate: {
            y: 0,
          },
        };
      }
      default: {
        // placement === "right"
        return {
          initial: {
            x: "100%",
          },
          animate: {
            x: 0,
          },
        };
      }
    }
  }, [placement]);

  return (
    <ReactFocusLock {...focusLockProps}>
      <SideDrawerContainer {...sideDrawerContainerProps}>
        <motion.div
          variants={motionVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          className={tx(styles({ placement, className }))}
          {...sideDrawerProps}
        >
          {children}
        </motion.div>
      </SideDrawerContainer>
    </ReactFocusLock>
  );
});

const SideDrawerContainer = forwardRef<HTMLDivElement, SideDrawerContainerProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const { getModalContainerProps: getSideDrawerContainerProps } = useModalContext();
  const sideDrawerContainerProps = getSideDrawerContainerProps(rest, ref);

  return (
    <div className={tx("fixed inset-0", className)} {...sideDrawerContainerProps}>
      {children}
    </div>
  );
});

SideDrawerContainer.displayName = "SideDrawerContainer";
SideDrawerContent.displayName = "SideDrawerContent";
export type { SideDrawerContentProps, SideDrawerContainerProps };
export { SideDrawerContent };
