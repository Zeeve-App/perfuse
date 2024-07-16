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

import React, { ReactNode, forwardRef, useMemo } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RemoveProperties } from "../core";
import { useProgressiveFormContext } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

interface ProgressiveFormFooterProps extends RemoveProperties<HTMLMotionProps<"div">, "children"> {
  children?: (({ isFirst, isLast }: { isFirst: boolean; isLast: boolean }) => ReactNode) | ReactNode;
}

const ProgressiveFormFooter = forwardRef<HTMLDivElement, ProgressiveFormFooterProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const { activeStep, totalSteps } = useProgressiveFormContext();

  const isFirst = useMemo(() => activeStep === 0, [activeStep]);
  const isLast = useMemo(() => activeStep === totalSteps - 1, [activeStep, totalSteps]);

  return (
    <motion.div className={tx("border-t border-brand-outline p-4", className)} ref={ref} {...rest}>
      {typeof children === "function" ? children({ isFirst, isLast }) : children}
    </motion.div>
  );
});

ProgressiveFormFooter.displayName = "ProgressiveFormFooter";
export type { ProgressiveFormFooterProps };
export { ProgressiveFormFooter };
