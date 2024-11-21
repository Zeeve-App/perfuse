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
import ReactFocusLock from "react-focus-lock";
import { AnimatePresence, HTMLMotionProps, Variants, motion } from "framer-motion";
import { Portal } from "../Portal";
import { usePopoverContext } from "../Popover";
import { useMergeRefs } from "@/hooks";
import { tx } from "@/utils/shared";

/** motion variants */
const motionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

/** dropdown menu list props */
interface DropdownMenuListProps extends HTMLMotionProps<"div"> {}

/** dropdown menu list component */
const DropdownMenuList = forwardRef<HTMLDivElement, DropdownMenuListProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { isOpen, setPopperElement, styles, attributes } = usePopoverContext();

  const refs = useMergeRefs(ref, setPopperElement);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Portal>
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <ReactFocusLock autoFocus={false}>
            <motion.div
              variants={motionVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              ref={refs}
              className={tx(
                "mt-2 w-max min-w-[148px] rounded-lg border border-brand-outline bg-theme-foreground py-2 shadow-lg",
                className,
              )}
              style={styles.popper}
              {...attributes.popper}
              {...rest}
            >
              {children}
            </motion.div>
          </ReactFocusLock>
        </Portal>
      ) : null}
    </AnimatePresence>
  );
});

DropdownMenuList.displayName = "DropdownMenuList";
export type { DropdownMenuListProps };
export { DropdownMenuList };
