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
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
// import {  IconArrow2Up } from "@zeeve-platform/icons/arrow/outline";
import { tx } from "@/utils/shared";
import { useToggle } from "@/hooks";
import SvgArrow2Down from "@/lib/icons/arrows/outline/Arrow2Down";
import SvgArrow2Up from "@/lib/icons/arrows/outline/Arrow2Up";

interface SidebarItemDropdownProps extends HTMLMotionProps<"button"> {
  title: string;
  iconLeft?: React.ReactElement;
  badge?: React.ReactElement;
  iconDropdownExpanded?: React.ReactElement;
  iconDropdownCollapsed?: React.ReactElement;
  isActive?: boolean;
}

const SidebarItemDropdown = forwardRef<HTMLButtonElement, SidebarItemDropdownProps>((props, ref) => {
  const {
    title,
    iconLeft,
    badge,
    iconDropdownExpanded,
    iconDropdownCollapsed,
    isActive,
    children,
    className,
    ...rest
  } = props;

  const { isOpen: isExpanded, handleToggle } = useToggle(isActive);
  const _iconDropdownCollapsed = iconDropdownCollapsed ? iconDropdownCollapsed : <SvgArrow2Down className="text-2xl" />;
  const _iconDropdownExpanded = iconDropdownExpanded ? iconDropdownExpanded : <SvgArrow2Up className="text-2xl" />;

  return (
    <>
      <motion.button
        className={tx(
          "group relative flex max-h-14 cursor-pointer items-center justify-start gap-3 px-6 py-4 text-white transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-brand-teal/5",
          className,
        )}
        ref={ref}
        {...rest}
        onClick={handleToggle}
      >
        <div
          className={`absolute left-0 w-[4px] rounded-r-full py-4 bg-brand-gradient group-hover:block ${
            isActive ? "block" : "hidden"
          }`}
        />
        {iconLeft ? iconLeft : null}
        <span className="flex flex-col gap-y-1 text-base font-normal leading-4">
          {title}
          {badge ? badge : null}
        </span>
        {isExpanded ? (
          <motion.div className="ml-auto">{_iconDropdownExpanded}</motion.div>
        ) : (
          <motion.div className="ml-auto">{_iconDropdownCollapsed}</motion.div>
        )}
      </motion.button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="flex flex-col font-medium"
            variants={{
              animate: { opacity: 1, height: "auto" },
              initial: { opacity: 0, height: 0 },
            }}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

SidebarItemDropdown.displayName = "SidebarItemDropdown";
export type { SidebarItemDropdownProps };
export { SidebarItemDropdown };
