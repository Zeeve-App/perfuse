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
import { VariantProps, cva } from "class-variance-authority";
import React, { forwardRef } from "react";
import { Label, LabelProps } from "../Label";
import { RemoveProperties } from "../../core";
import { useID } from "@/hooks";
import { tx } from "@/utils/shared";

interface RadioLabelProps extends LabelProps {}

const RadioLabel = forwardRef<HTMLLabelElement, RadioLabelProps>((props, ref) => {
  const { children, className, isDisabled, isRequired, ...rest } = props;

  return (
    <Label
      className={tx("relative cursor-pointer select-none gap-2 text-sm font-medium", className)}
      isRequired={isRequired}
      isDisabled={isDisabled}
      ref={ref}
      {...rest}
    >
      {children}
    </Label>
  );
});

const styles = cva(
  "inline-flex size-6 items-center justify-center rounded-full bg-brand-outline after:absolute after:rounded-full after:content-[''] after:peer-checked:block after:peer-checked:bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-zinc-300 peer-focus:ring-offset-1 peer-focus-visible:outline-none peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      colorScheme: {
        primary: "peer-checked:bg-brand-primary",
        blue: "peer-checked:bg-brand-blue",
        dark: "peer-checked:bg-brand-dark",
        red: "peer-checked:bg-brand-red",
        green: "peer-checked:bg-brand-green",
        yellow: "peer-checked:bg-brand-yellow",
        gray: "peer-checked:bg-brand-gray",
        teal: "peer-checked:bg-brand-teal",
        cyan: "peer-checked:bg-brand-cyan",
        light: "peer-checked:bg-brand-light",
        purple: "peer-checked:bg-brand-purple",
        pink: "peer-checked:bg-brand-pink",
        gradient: "peer-checked:bg-brand-gradient",
      },
      size: {
        small: "size-4 after:size-2",
        medium: "size-6 after:size-3",
        large: "size-8 after:size-4",
      },
    },
    defaultVariants: {
      colorScheme: "gradient",
      size: "medium",
    },
  },
);

interface RadioProps
  extends RemoveProperties<React.ComponentPropsWithRef<"input">, "type" | "size" | "checked" | "disabled" | "required">,
    VariantProps<typeof styles> {
  isDisabled?: boolean;
  isChecked?: boolean;
  isRequired?: boolean;
  hideRadioCircle?: boolean;
  radioLabelProps?: React.ComponentPropsWithRef<"label">;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    children,
    isDisabled,
    isChecked,
    isRequired,
    radioLabelProps,
    colorScheme,
    size,
    className,
    id,
    hideRadioCircle,
    ...rest
  } = props;

  const [_id] = useID(id, "radio");

  return (
    // radio label
    <RadioLabel
      htmlFor={_id}
      isDisabled={isDisabled}
      className={tx("flex items-center justify-center")}
      {...radioLabelProps}
    >
      {/* default radio */}
      <input
        type="radio"
        ref={ref}
        id={_id}
        className="peer sr-only"
        checked={isChecked}
        disabled={isDisabled}
        required={isRequired}
        {...rest}
      />

      {!hideRadioCircle && <div className={tx(styles({ colorScheme, size, className }))} />}
      {children}
      {/* custom radio */}
    </RadioLabel>
  );
});

export type { RadioProps };
export { Radio };
