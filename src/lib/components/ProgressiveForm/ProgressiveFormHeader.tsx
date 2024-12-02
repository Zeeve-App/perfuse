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

import React, { cloneElement, forwardRef, Children, useMemo } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { useProgressiveFormContext } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

/** progressive form header props */
interface ProgressiveFormHeaderProps extends HTMLMotionProps<"div"> {
  children: React.ReactElement[] | React.ReactElement;
}

/** progressive form header component */
const ProgressiveFormHeader = forwardRef<HTMLDivElement, ProgressiveFormHeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { activeStep, isCompact } = useProgressiveFormContext();

  const indexedChildren = useMemo(() => {
    if (isCompact) {
      return Children.map(children, (child, index) => {
        if (index === activeStep)
          return cloneElement(child, {
            componentIndex: index,
            key: index,
          });
      });
    } else {
      return Children.map(children, (child, index) =>
        cloneElement(child, {
          componentIndex: index,
          key: index,
        }),
      );
    }
  }, [activeStep, isCompact, children]);

  return (
    <motion.div className={tx("flex flex-row gap-2 overflow-auto px-2", className)} ref={ref} {...rest}>
      {indexedChildren}
    </motion.div>
  );
});

ProgressiveFormHeader.displayName = "ProgressiveFormHeader";
export type { ProgressiveFormHeaderProps };
export { ProgressiveFormHeader };
