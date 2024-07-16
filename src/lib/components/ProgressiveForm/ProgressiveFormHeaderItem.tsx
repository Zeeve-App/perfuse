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

import React, { forwardRef, useEffect, useMemo } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RemoveProperties } from "../core";
import { FormStatus, useProgressiveFormContext } from "./ProgressiveFormContext";
import { tx } from "@/utils/shared";

interface ProgressiveFormHeaderItemProps extends RemoveProperties<HTMLMotionProps<"div">, "title"> {
  icons?: {
    idle?: React.ReactElement;
    active?: React.ReactElement;
    completed?: React.ReactElement;
  };
  iconProps?: HTMLMotionProps<"div">;
  shouldHideIcon?: boolean;
  shouldHideIconOnCompact?: boolean;
  title: string | React.ReactElement;
  titleProps?: HTMLMotionProps<"div">;
  stepLabel?: string | ((index: number) => string);
  stepLabelProps?: HTMLMotionProps<"div">;
  componentIndex?: number;
  isLast?: boolean;
}

const defaultIcons: ProgressiveFormHeaderItemProps["icons"] = {
  idle: <div data-status="idle" className="size-3 rounded-full bg-slate-300" />,
  active: <div data-status="active" className="size-3 rounded-full bg-brand-yellow" />,
  completed: <div data-status="completed" className="size-3 rounded-full bg-brand-green" />,
};

const ProgressiveFormHeaderItem = forwardRef<HTMLDivElement, ProgressiveFormHeaderItemProps>((props, ref) => {
  const {
    icons,
    iconProps,
    shouldHideIcon,
    shouldHideIconOnCompact,
    title,
    titleProps,
    stepLabel,
    stepLabelProps,
    className,
    componentIndex = 0,
    ...rest
  } = props;

  const { formStatus, activeStep, isCompact, shouldHideHeaderIconsOnCompact, totalSteps } = useProgressiveFormContext();

  const status = useMemo(() => formStatus(componentIndex), [componentIndex, activeStep]);

  const getIcon = (data: ProgressiveFormHeaderItemProps["icons"], status: FormStatus) => {
    if (data === undefined || data === null) return defaultIcons[status];
    else return data[status] ? data[status] : defaultIcons[status];
  };

  const _shouldHideIcon = useMemo(() => {
    if (shouldHideIcon !== undefined) return shouldHideIcon;

    if (isCompact) {
      if (shouldHideIconOnCompact !== undefined) return shouldHideIconOnCompact;

      if (shouldHideHeaderIconsOnCompact !== undefined) return shouldHideHeaderIconsOnCompact;

      return true;
    } else return false;
  }, [shouldHideIcon, isCompact, shouldHideIconOnCompact, shouldHideHeaderIconsOnCompact]);

  const getStepLabel = (stepLabel: ProgressiveFormHeaderItemProps["stepLabel"], index: number) => {
    if (typeof stepLabel === "function") return stepLabel(index + 1);
    if (typeof stepLabel === "string") return stepLabel || `Step ${index + 1}`;
    else return `Step ${index + 1}`;
  };

  const isLast = totalSteps - 1 == componentIndex;

  return (
    <motion.div className={tx("grid grid-cols-12", isLast ? "flex-grow-0" : "flex-grow")}>
      <motion.div className={tx(isLast ? "col-span-12" : "col-span-5")}>
        <motion.div
          ref={ref}
          {...rest}
          className={tx(
            "flex select-none flex-row items-start gap-2.5 p-4",
            // { "opacity-50": status === "idle" },
            className,
          )}
          data-status={status}
          data-component-index={componentIndex}
          data-active-index={activeStep}
        >
          {!_shouldHideIcon && (
            <motion.div {...iconProps} className={tx("self-center", iconProps?.className)}>
              {getIcon(icons, status)}
            </motion.div>
          )}
          {typeof title === "string" ? (
            <motion.div>
              <motion.div
                {...stepLabelProps}
                className={tx(
                  "text-xs font-medium text-brand-gray leading-[18px] -tracking-[0.4px]",
                  stepLabelProps?.className,
                  {
                    "text-brand-blue": status === "active",
                  },
                )}
              >
                {getStepLabel(stepLabel, componentIndex)}
              </motion.div>
              <motion.div
                {...titleProps}
                className={tx(
                  "font-poppins text-sm text-brand-gray font-semibold tracking-[0.1px]",
                  { "text-brand-darker-blue": status === "active" },
                  titleProps?.className,
                )}
              >
                {title}
              </motion.div>
            </motion.div>
          ) : (
            title
          )}
        </motion.div>
      </motion.div>
      {!isLast && (
        <motion.div className="col-span-7 flex items-center justify-center">
          <div className={tx("w-full border", status === "idle" ? "" : "border-brand-blue")}></div>
        </motion.div>
      )}
    </motion.div>
  );
});

ProgressiveFormHeaderItem.displayName = "ProgressiveFormHeaderItem";
export type { ProgressiveFormHeaderItemProps };
export { ProgressiveFormHeaderItem };
