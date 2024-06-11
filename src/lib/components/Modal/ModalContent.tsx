/* eslint-disable react/display-name */
import React, { forwardRef, useEffect } from "react";
import ReactFocusLock from "react-focus-lock";
import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { useModalContext } from "./ModalContextProvider";
import { tx } from "@/utils/shared";

const motionVariants: Variants = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 50,
    opacity: 0,
  },
};

interface ModalContainerProps extends React.ComponentPropsWithRef<"div"> {}

interface ModalContentProps extends HTMLMotionProps<"div"> {
  modalContainerProps?: ModalContainerProps;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>((props, ref) => {
  const { className, children, modalContainerProps, ...rest } = props;
  const { getModalProps, setIsModalMounted } = useModalContext();
  const modalProps = getModalProps(rest, ref);

  useEffect(() => {
    setIsModalMounted(true);
    return () => setIsModalMounted(false);
  }, [setIsModalMounted]);

  return (
    <ReactFocusLock>
      <ModalContainer {...modalContainerProps}>
        {/* Modal Dialog */}
        <motion.div
          variants={motionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={tx("flex w-max max-w-xl flex-col rounded-lg bg-white shadow-lg outline-none", className)}
          {...modalProps}
        >
          {children}
        </motion.div>
      </ModalContainer>
    </ReactFocusLock>
  );
});

const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const { getModalContainerProps } = useModalContext();
  const modalContainerProps = getModalContainerProps(rest, ref);

  return (
    <div className={tx("fixed inset-0 flex items-center justify-center", className)} {...modalContainerProps}>
      {children}
    </div>
  );
});

ModalContent.displayName = "ModalContent";
export type { ModalContentProps };
export { ModalContent };
