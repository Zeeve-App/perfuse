import React from "react";
import { AnimatePresence } from "framer-motion";
import { Portal, PortalProps } from "../Portal";
import { useModal, UseModalProps } from "./useModal";
import ModalContextProvider from "./ModalContextProvider";

interface ModalProps extends UseModalProps {
  children: React.ReactNode;
  portalProps?: Pick<PortalProps, "isNested">;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, portalProps, ...modalProps } = props;
  const modal = useModal(modalProps);

  return (
    <ModalContextProvider value={modal}>
      <AnimatePresence>{modal.isOpen ? <Portal {...portalProps}>{children}</Portal> : null}</AnimatePresence>
    </ModalContextProvider>
  );
};

Modal.displayName = "Modal";
export type { ModalProps };
export { Modal };
