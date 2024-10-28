/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
          className={tx(
            "flex w-max max-w-xl flex-col rounded-lg bg-theme-foreground shadow-lg outline-none",
            className,
          )}
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
