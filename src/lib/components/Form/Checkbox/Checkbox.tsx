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

interface CheckboxLabelProps extends LabelProps {}

const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabelProps>((props, ref) => {
  const { children, className, isDisabled, isRequired, ...rest } = props;

  return (
    <Label
      className={tx("cursor-pointer select-none gap-2 text-sm font-medium ", className)}
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
  "cursor-pointer appearance-none  rounded-full border-2 border-brand-outline focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-1 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      colorScheme: {
        primary: "text-brand-primary",
        blue: "text-brand-blue",
        dark: "text-brand-dark",
        red: "text-brand-red",
        green: "text-brand-green",
        yellow: "text-brand-yellow",
        gray: "text-brand-gray",
        teal: "text-brand-teal",
        cyan: "text-brand-cyan",
        light: "text-brand-light",
        purple: "text-brand-purple",
        pink: "text-brand-pink",
      },
      size: {
        small: "size-4",
        medium: "size-6",
        large: "size-8",
      },
    },
    defaultVariants: {
      colorScheme: "primary",
      size: "medium",
    },
  },
);

interface CheckboxProps
  extends RemoveProperties<React.ComponentPropsWithRef<"input">, "type" | "size" | "checked" | "disabled" | "required">,
    VariantProps<typeof styles> {
  isDisabled?: boolean;
  isChecked?: boolean;
  isRequired?: boolean;
  checkboxLabelProps?: React.ComponentPropsWithRef<"label">;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { children, isDisabled, isChecked, isRequired, checkboxLabelProps, colorScheme, size, className, id, ...rest } =
    props;

  const [_id] = useID(id, "checkbox");

  return (
    // checkbox label
    <CheckboxLabel htmlFor={_id} isDisabled={isDisabled} {...checkboxLabelProps}>
      {/* checkbox */}
      <input
        type="checkbox"
        ref={ref}
        id={_id}
        className={tx(styles({ colorScheme, size, className }))}
        checked={isChecked}
        disabled={isDisabled}
        required={isRequired}
        {...rest}
      />
      {children}
    </CheckboxLabel>
  );
});

export type { CheckboxProps };
export { Checkbox };
