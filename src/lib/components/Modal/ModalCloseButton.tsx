import React, { forwardRef } from "react";
import { CloseButton, CloseButtonProps } from "../Button";
import { useModalContext } from "./ModalContextProvider";
import { callMultipleHandlers } from "@/utils/shared";

interface ModalCloseButtonProps extends CloseButtonProps {}

const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>((props, ref) => {
  const { onClick, ...rest } = props;
  const { handleClose } = useModalContext();

  return (
    <CloseButton
      onClick={callMultipleHandlers(onClick, (event: React.MouseEvent) => {
        event.stopPropagation();
        handleClose();
      })}
      ref={ref}
      {...rest}
    />
  );
});

ModalCloseButton.displayName = "ModalCloseButton";
export type { ModalCloseButtonProps };
export { ModalCloseButton };
