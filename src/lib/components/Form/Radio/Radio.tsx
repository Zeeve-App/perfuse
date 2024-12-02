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

/** radio label props */
interface RadioLabelProps extends LabelProps {}

/** radio label component */
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

/** radio variant */
const styles = cva(
  /** common class in all variant */
  "inline-flex size-6 items-center justify-center rounded-full border border-brand-blue bg-white after:rounded-full after:content-[''] after:peer-checked:block after:peer-checked:bg-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-zinc-300 peer-focus:ring-offset-1 peer-focus-visible:outline-none peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      colorScheme: {
        primary: "after:peer-checked:bg-brand-primary",
        blue: "after:peer-checked:bg-brand-blue",
        dark: "after:peer-checked:bg-brand-dark",
        red: "after:peer-checked:bg-brand-red",
        green: "after:peer-checked:bg-brand-green",
        yellow: "after:peer-checked:bg-brand-yellow",
        gray: "after:peer-checked:bg-brand-gray",
        teal: "after:peer-checked:bg-brand-teal",
        cyan: "after:peer-checked:bg-brand-cyan",
        light: "after:peer-checked:bg-brand-light",
        purple: "after:peer-checked:bg-brand-purple",
        pink: "after:peer-checked:bg-brand-pink",
        gradient: "after:peer-checked:bg-brand-gradient",
      },
      size: {
        small: "size-4 after:size-3",
        medium: "size-6 after:size-4",
        large: "size-8 after:size-5",
      },
    },
    /** default variants */
    defaultVariants: {
      colorScheme: "blue",
      size: "medium",
    },
  },
);

/** radio props */
interface RadioProps
  extends RemoveProperties<React.ComponentPropsWithRef<"input">, "type" | "size" | "checked" | "disabled" | "required">,
    VariantProps<typeof styles> {
  isDisabled?: boolean;
  isChecked?: boolean;
  isRequired?: boolean;
  hideRadioCircle?: boolean;
  radioLabelProps?: React.ComponentPropsWithRef<"label">;
  rightCheckedIcon?: JSX.Element;
}

/** radio component */
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
    rightCheckedIcon,
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
      {isChecked && rightCheckedIcon && rightCheckedIcon}
      {/* custom radio */}
    </RadioLabel>
  );
});

export type { RadioProps };
export { Radio };
