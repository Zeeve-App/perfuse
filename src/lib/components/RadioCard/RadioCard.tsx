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
import { RemoveProperties } from "../core";
import { Radio } from "../Form";
import { IconButton } from "../Button";
import { Tooltip } from "../Tooltip";
import { tx } from "@/utils/shared";
import SvgInfoCircle from "@/lib/icons/essential/outline/InfoCircle";
import SvgCheckCircle from "@/lib/icons/essential/outline/CheckCircle";

interface RadioCardProps
  extends RemoveProperties<
    React.ComponentPropsWithRef<"input">,
    "disabled" | "type" | "checked" | "size" | "required"
  > {
  isDisabled?: boolean;
  isRequired?: boolean;
  isChecked?: boolean;
  colorScheme?:
    | "blue"
    | "dark"
    | "red"
    | "green"
    | "yellow"
    | "gray"
    | "teal"
    | "cyan"
    | "light"
    | "purple"
    | "pink"
    | "gradient"
    | null;
  size?: "small" | "medium" | "large";
  hideRadioCircle?: boolean;
  tooltipText?: string;
}

const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>((props, ref) => {
  const {
    children,
    className,
    colorScheme,
    size,
    isRequired,
    isDisabled,
    isChecked,
    hideRadioCircle,
    tooltipText,
    ...rest
  } = props;

  return (
    <Radio
      radioLabelProps={{
        className: tx(
          "flex shrink h-[60px] w-full select-none items-center justify-between rounded-md border border-brand-outline  px-4 py-2 focus-within:border-brand-blue hover:border-brand-blue hover:bg-theme-gradient transition ease-in-out duration-200 hover:text-white",
          className,
          { "border-brand-blue bg-theme-gradient text-white": isChecked },
          { "border-brand-outline hover:border-brand-outline": isDisabled },
        ),
      }}
      isChecked={isChecked}
      isDisabled={isDisabled}
      isRequired={isRequired}
      colorScheme={colorScheme}
      rightCheckedIcon={<SvgCheckCircle fill="#0BB63B" className="hidden size-8 lg:inline" />}
      size={size}
      hideRadioCircle={hideRadioCircle}
      ref={ref}
      {...rest}
    >
      <span
        className={tx({
          "inline-flex after:pl-1 after:text-brand-red after:content-['*']": isRequired,
          "flex items-center justify-start w-full gap-2": true,
        })}
      >
        {children}
        {tooltipText && (
          <Tooltip text={tooltipText?.toString() as string} placement="top-start">
            <IconButton variant="text" colorScheme="gray">
              <SvgInfoCircle className="text-lg " />
            </IconButton>
          </Tooltip>
        )}
      </span>
    </Radio>
  );
});

export type { RadioCardProps };
export { RadioCard };
