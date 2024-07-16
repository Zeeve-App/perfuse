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

export { type ModalProps, Modal } from "./Modal";
export { type ModalBodyProps, ModalBody } from "./ModalBody";
export { type ModalCloseButtonProps, ModalCloseButton } from "./ModalCloseButton";
export { type ModalContentProps, ModalContent } from "./ModalContent";
export {
  default as ModalContextProvider,
  type ModalContextProps,
  ModalContext,
  ModalContextConsumer,
  useModalContext,
} from "./ModalContextProvider";
export { type ModalFooterProps, ModalFooter } from "./ModalFooter";
export { type ModalOverlayProps, ModalOverlay } from "./ModalOverlay";
export { type ModalTextProps, ModalText } from "./ModalText";
export { type ModalTitleProps, ModalTitle } from "./ModalTitle";
export { type UseModalProps, useModal, type UseModalReturnType } from "./useModal";
