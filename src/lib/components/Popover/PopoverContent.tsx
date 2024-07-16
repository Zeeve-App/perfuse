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

/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import ReactFocusLock from "react-focus-lock";
import { AnimatePresence, HTMLMotionProps, Variants, motion } from "framer-motion";
// eslint-disable-next-line import/no-unresolved
import { ReactFocusLockProps } from "react-focus-lock/interfaces";
import { Portal } from "../Portal";
import { usePopoverContext } from "./PopoverContext";
import { tx } from "@/utils/shared";
import { useMergeRefs } from "@/hooks";

const motionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface PopoverContentProps extends HTMLMotionProps<"div"> {
  focusLockProps?: ReactFocusLockProps;
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const { children, className, focusLockProps, ...rest } = props;

  const { isOpen, setPopperElement, styles, attributes } = usePopoverContext();

  const refs = useMergeRefs(ref, setPopperElement);

  return (
    <AnimatePresence>
      {isOpen ? (
        <Portal>
          <ReactFocusLock {...focusLockProps}>
            <motion.div
              variants={motionVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              ref={refs}
              className={tx(
                "w-max max-w-sm rounded-lg border border-brand-outline bg-brand-dark/80 p-3 text-white backdrop-blur",
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

export type { PopoverContentProps };
export { PopoverContent };
