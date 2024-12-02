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
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion, MotionProps } from "framer-motion";
import { tx } from "@/utils/shared";

/** progress variant */
const progressStyles = cva("w-full overflow-hidden rounded-full bg-neutral-200", {
  variants: {
    size: {
      xSmall: "h-2 text-[8px]",
      small: "h-4 text-sm",
      medium: "h-6 text-base",
      large: "h-8 text-lg",
      xLarge: "h-10 text-xl",
    },
  },
  compoundVariants: [],
  /** progress default variant */
  defaultVariants: {
    size: "small",
  },
});

/** progress bar variant */
const progressBarStyles = cva(
  /** class for all the variants */
  "flex h-full items-center justify-center rounded-full font-semibold text-white bg-brand-gradient",
  {
    variants: {},
    compoundVariants: [],
    defaultVariants: {},
  },
);

/** progress props */
interface ProgressProps extends HTMLMotionProps<"div">, VariantProps<typeof progressStyles> {
  value: number;
  max: number;
  shouldShowProgress?: boolean;
  progressBarProps?: ProgressBarProps;
}

/** progress component */
const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { className, size, value, max, shouldShowProgress, progressBarProps, ...rest } = props;
  const progress = Math.round((value / max) * 100);

  return (
    <motion.div className={tx(progressStyles({ size, className }))} ref={ref} {...rest}>
      <ProgressBar progress={progress} shouldShowProgress={shouldShowProgress} {...progressBarProps} />
    </motion.div>
  );
});

/** progress bar props */
interface ProgressBarProps extends HTMLMotionProps<"div">, VariantProps<typeof progressBarStyles> {
  progress?: number;
  shouldShowProgress?: boolean;
}

/** progress bar component */
const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const { progress, shouldShowProgress, className, ...rest } = props;

  const progressBarMotionProps: MotionProps = {
    animate: {
      width: `${progress}%`,
    },
  };

  return (
    <motion.div
      className={tx(progressBarStyles({ className }))}
      role="progressbar"
      ref={ref}
      {...progressBarMotionProps}
      {...rest}
    >
      {shouldShowProgress ? `${progress}%` : null}
    </motion.div>
  );
});

Progress.displayName = "Progress";
export type { ProgressBarProps, ProgressProps };
export { Progress };
