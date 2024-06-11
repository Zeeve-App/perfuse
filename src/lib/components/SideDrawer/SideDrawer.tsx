import React, { useMemo } from "react";
import { Modal, ModalProps } from "../Modal";
import SideDrawerContextProvider, { SideDrawerContextProps } from "./SideDrawerContextProvider";

interface SideDrawerProps extends SideDrawerContextProps, ModalProps {}

const SideDrawer = (props: SideDrawerProps) => {
  const { isOpen, handleClose, placement = "right", children, ...rest } = props;

  const contextValues: SideDrawerContextProps = useMemo(
    () => ({
      placement,
    }),
    [placement],
  );

  return (
    <SideDrawerContextProvider value={contextValues}>
      <Modal isOpen={isOpen} handleClose={handleClose} {...rest}>
        {children}
      </Modal>
    </SideDrawerContextProvider>
  );
};

export type { SideDrawerProps };
export { SideDrawer };
