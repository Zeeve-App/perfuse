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
import { HTMLMotionProps, motion } from "framer-motion";
import { tx } from "@/utils/shared";

/** dropdown menu group props */
interface DropdownMenuGroupProps extends HTMLMotionProps<"div"> {}

/** dropdown menu group component */
const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.div className={tx("flex flex-col", className)} role="contentinfo" ref={ref} {...rest}>
      {children}
    </motion.div>
  );
});

DropdownMenuGroup.displayName = "DropdownMenuGroup";
export type { DropdownMenuGroupProps };
export { DropdownMenuGroup };
