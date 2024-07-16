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

interface SidebarItemGroupProps extends HTMLMotionProps<"div"> {}

const SidebarItemGroup = forwardRef<HTMLDivElement, SidebarItemGroupProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <motion.div className={tx("flex flex-col py-6", className)} ref={ref} {...rest}>
      {children}
    </motion.div>
  );
});

SidebarItemGroup.displayName = "SidebarItemGroup";
export type { SidebarItemGroupProps };
export { SidebarItemGroup };
