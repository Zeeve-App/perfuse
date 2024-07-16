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
