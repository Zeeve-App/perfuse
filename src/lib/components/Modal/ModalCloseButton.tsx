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

import React, { forwardRef } from "react";
import { CloseButton, CloseButtonProps } from "../Button";
import { useModalContext } from "./ModalContextProvider";
import { callMultipleHandlers } from "@/utils/shared";

/** modal close button props */
interface ModalCloseButtonProps extends CloseButtonProps {}

/** modal close button component */
const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>((props, ref) => {
  const { onClick, ...rest } = props;
  /** modal context */
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
