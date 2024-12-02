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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";
import { modalManager, useModalManager } from "./ModalManager";
import { mergeRefs, useID } from "@/hooks";
import { callMultipleHandlers } from "@/utils/shared";

/** modal hook props */
interface UseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  id?: string;
  shouldBackdropDismiss?: boolean;
}

/** modal hooks */
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
