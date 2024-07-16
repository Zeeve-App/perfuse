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

import { VariantProps, cva } from "class-variance-authority";
import React, { forwardRef } from "react";
// import { IconInfoCircle } from "@zeeve-platform/icons/essential/outline";
import { Label } from "../Label";
import { IconButton } from "../../Button";
import { Tooltip } from "../../Tooltip";
import { RemoveProperties } from "../../core";
import { useID } from "@/hooks";
import { tx } from "@/utils/shared";

const styles = cva(
  "peer w-full appearance-none truncate rounded-lg border border-brand-outline p-4 text-sm font-medium leading-5 text-brand-dark placeholder:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#f3f6fd] disabled:font-normal disabled:text-brand-dark/60",
  {
    variants: {
      size: {
        small: "h-[50px] text-sm placeholder:text-sm",
        medium: "h-[60px] text-base placeholder:text-base",
        large: "h-[70px] text-xl placeholder:text-xl",
      },
      iconLeft: {
        true: "pl-12",
      },
      iconRight: {
        true: "pr-12",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

type FloatingLabel = {
  labelText: string;
  floatingLabelProps?: React.ComponentPropsWithRef<"label">;
};

interface InputProps
  extends RemoveProperties<React.ComponentPropsWithRef<"input">, "required" | "disabled" | "size">,
    RemoveProperties<VariantProps<typeof styles>, "iconLeft" | "iconRight"> {
  inputContainerProps?: React.ComponentPropsWithRef<"div">;
  iconLeft?: React.ReactElement;
  iconLeftContainerProps?: React.ComponentPropsWithRef<"div">;
  iconRight?: React.ReactElement;
  iconRightContainerProps?: React.ComponentPropsWithRef<"div">;
  floatingLabel?: FloatingLabel;
  isDisabled?: boolean;
  isRequired?: boolean;
  tooltip?: string | React.ReactElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    isDisabled,
    size,
    iconLeft,
    iconRight,
    inputContainerProps,
    iconLeftContainerProps,
    iconRightContainerProps,
    placeholder,
    floatingLabel,
    isRequired,
    id,
    tooltip,
    ...rest
  } = props;

  const [_id] = useID(id, "input");

  return (
    // input container
    <div
      {...inputContainerProps}
      className={tx(
        "relative flex h-max w-full font-poppins",
        { "cursor-not-allowed ": isDisabled },
        inputContainerProps?.className,
      )}
    >
      {/* left icon */}
      {iconLeft && (
        <div
          {...iconLeftContainerProps}
          className={tx(
            "absolute inset-y-0 left-0 flex items-center",
            { "cursor-not-allowed opacity-50": isDisabled },
            iconLeftContainerProps?.className,
          )}
        >
          {iconLeft}
        </div>
      )}

      {/* input field */}
      <input
        id={_id}
        className={tx(
          styles({
            size,
            iconLeft: iconLeft ? true : false,
            iconRight: iconRight ? true : false,
            className,
          }),
        )}
        required={isRequired}
        disabled={isDisabled}
        placeholder={floatingLabel === undefined ? placeholder : " "}
        ref={ref}
        {...rest}
      />

      {/* label */}
      {floatingLabel && (
        <Label
          htmlFor={_id}
          {...floatingLabel.floatingLabelProps}
          isRequired={isRequired}
          isDisabled={isDisabled}
          className={tx(
            "absolute left-4 right-4 top-4 origin-[0] -translate-y-4 scale-75 transform cursor-text gap-1 font-sans text-sm font-medium text-brand-dark/60 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:left-4 peer-focus:top-4 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-sm",
            { "peer-placeholder-shown:left-12": iconLeft },
            { "right-12": iconRight },
            floatingLabel.floatingLabelProps?.className,
          )}
        >
          <span className="line-clamp-1">{floatingLabel.labelText}</span>
          {/* tooltip */}
          {typeof tooltip === "string" && tooltip ? (
            <Tooltip text={tooltip} placement="bottom-start">
              <IconButton variant="text" colorScheme="gray" isDisabled={isDisabled}>
                {/* <IconInfoCircle className="text-sm" /> */}
              </IconButton>
            </Tooltip>
          ) : (
            tooltip
          )}
        </Label>
      )}

      {/* right icon */}
      {iconRight && (
        <div
          {...iconRightContainerProps}
          className={tx(
            "absolute inset-y-0 right-0 flex items-center",
            { "cursor-not-allowed opacity-50": isDisabled },
            iconRightContainerProps?.className,
          )}
        >
          {iconRight}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
export type { InputProps };
export { Input };
