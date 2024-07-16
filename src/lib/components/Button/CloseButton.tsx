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
import { RemoveProperties } from "../core";
import { IconButton, IconButtonProps } from "./IconButton";
import { tx } from "@/utils/shared";
import SvgXMark from "@/lib/icons/essential/outline/XMark";

type CloseButtonProps = RemoveProperties<IconButtonProps, "children" | "size" | "isLoading">;

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <IconButton
      variant="text"
      colorScheme="dark"
      className={tx("rounded-md border-current", className)}
      aria-label="Close"
      ref={ref}
      {...rest}
    >
      {<SvgXMark />}
    </IconButton>
  );
});

CloseButton.displayName = "CloseButton";
export type { CloseButtonProps };
export { CloseButton };
