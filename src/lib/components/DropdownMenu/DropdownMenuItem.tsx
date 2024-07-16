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
import { Button, ButtonProps } from "../Button";
import { RemoveProperties } from "../core";
import { tx } from "@/utils/shared";

interface DropdownMenuItemProps extends RemoveProperties<ButtonProps, "isLoading"> {}

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Button
      className={tx(
        "flex w-full cursor-pointer items-center justify-start gap-3 rounded-none bg-transparent px-4 py-2 font-medium text-brand-dark hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white",
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";
export type { DropdownMenuItemProps };
export { DropdownMenuItem };
