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

import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { ProgressiveFormContextProvider, ProgressiveFormContextProps } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

/** progress form props */
interface ProgressiveFormProps
  extends HTMLMotionProps<"div">,
    Pick<ProgressiveFormContextProps, "activeStep" | "setActiveStep"> {
  isCompact?: boolean;
  shouldHideHeaderIconsOnCompact?: boolean;
}

/** progress form component */
const ProgressiveForm = forwardRef<HTMLDivElement, ProgressiveFormProps>((props, ref) => {
  const {
    activeStep = 0,
    setActiveStep,
    isCompact,
    shouldHideHeaderIconsOnCompact,
    className,
    children,
    ...rest
  } = props;

  const [_totalSteps, _setTotalSteps] = useState<number>(0);

  const setTotalSteps = useCallback((count: number) => _setTotalSteps(count), []);

  const values = useMemo(
    (): ProgressiveFormContextProps => ({
      activeStep,
      setActiveStep,
      totalSteps: _totalSteps,
      setTotalSteps,
      isCompact,
      shouldHideHeaderIconsOnCompact,
    }),
    [isCompact, shouldHideHeaderIconsOnCompact, activeStep, _totalSteps],
  );

  return (
    <ProgressiveFormContextProvider value={values}>
      <motion.div className={tx("rounded-lg border border-brand-outline", className)} ref={ref} {...rest}>
        {children}
      </motion.div>
    </ProgressiveFormContextProvider>
  );
});

ProgressiveForm.displayName = "ProgressiveForm";
export type { ProgressiveFormProps };
export { ProgressiveForm };
