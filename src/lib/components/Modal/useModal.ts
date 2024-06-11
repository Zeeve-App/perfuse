/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";
import { modalManager, useModalManager } from "./ModalManager";
import { mergeRefs, useID } from "@/hooks";
import { callMultipleHandlers } from "@/utils/shared";

interface UseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  id?: string;
  shouldBackdropDismiss?: boolean;
}

const useModal = (props: UseModalProps) => {
  const { isOpen, handleClose, id, shouldBackdropDismiss = true } = props;

  const modalContainerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const [modalID, modalContainerID] = useID(id, "modal", "modal__container");

  const [isModalMounted, setIsModalMounted] = useState(false);
  useModalManager(modalRef, isModalMounted, isOpen);

  const mouseDownRef = useRef<EventTarget | null>(null);
  const onMouseDown = useCallback((event: React.MouseEvent) => {
    mouseDownRef.current = event.target;
  }, []);

  const handleBackdropDismiss = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      if (mouseDownRef.current !== event.target) return;
      if (!modalManager.isOnTop(modalRef.current)) return;
      if (shouldBackdropDismiss) {
        handleClose?.();
      }
    },
    [handleClose, shouldBackdropDismiss],
  );

  const getModalContainerProps = useCallback(
    (props: React.ComponentPropsWithoutRef<"div"> = {}, ref: React.Ref<any> = null) => ({
      ...props,
      ref: mergeRefs(ref, modalContainerRef),
      id: modalContainerID,
      tabIndex: -1,
      onClick: callMultipleHandlers(props.onClick, handleBackdropDismiss),
      onMouseDown: onMouseDown,
    }),
    [onMouseDown, modalContainerID, handleBackdropDismiss],
  );

  const getModalProps = useCallback(
    (props: any = {}, ref: React.Ref<any> = null) => ({
      role: "dialog",
      ...props,
      ref: mergeRefs(ref, modalRef),
      key: modalID,
      id: modalID,
      tabIndex: -1,
      onClick: callMultipleHandlers(props.onClick, (event: React.MouseEvent) => event.stopPropagation()),
    }),
    [modalID],
  );

  return {
    isOpen,
    handleClose,
    modalRef,
    modalContainerRef,
    getModalContainerProps,
    getModalProps,
    isModalMounted,
    setIsModalMounted,
  };
};

type UseModalReturnType = ReturnType<typeof useModal>;

export { type UseModalProps, useModal, type UseModalReturnType };
