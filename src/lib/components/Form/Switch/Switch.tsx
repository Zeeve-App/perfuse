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
import React, { forwardRef, useEffect } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Label, LabelProps } from "../Label";
import { RemoveProperties } from "../../core";
import { useID } from "@/hooks";
import { tx } from "@/utils/shared";

interface SwitchLabelProps extends LabelProps {}

const SwitchLabel = forwardRef<HTMLLabelElement, SwitchLabelProps>((props, ref) => {
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
  "inline-flex items-center rounded-full bg-brand-outline after:absolute after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-zinc-300 peer-focus:ring-offset-1 peer-focus-visible:outline-none peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
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
        small: "h-4 w-7 p-1.5 after:size-2",
        medium: "h-6 w-12 p-2 after:size-4",
        large: "h-8 w-14 p-2 after:size-5",
      },
    },
    defaultVariants: {
      colorScheme: "gradient",
      size: "medium",
    },
  },
);

interface SwitchProps
  extends RemoveProperties<React.ComponentPropsWithRef<"input">, "type" | "size" | "checked" | "disabled" | "required">,
    VariantProps<typeof styles> {
  isDisabled?: boolean;
  isChecked?: boolean;
  isRequired?: boolean;
  switchLabelProps?: React.ComponentPropsWithRef<"label">;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { children, isDisabled, isChecked, isRequired, switchLabelProps, colorScheme, size, className, id, ...rest } =
    props;

  const [_id] = useID(id, "switch");

  useEffect(() => {
    console.log({ isChecked });
  }, [isChecked]);
  return (
    <SwitchLabel htmlFor={_id} isDisabled={isDisabled} {...switchLabelProps}>
      <input
        type="checkbox"
        ref={ref}
        id={_id}
        className="peer sr-only"
        checked={isChecked}
        disabled={isDisabled}
        required={isRequired}
        {...rest}
      />
      <div className={tx(styles({ colorScheme, size, className }))} />
      {children}
    </SwitchLabel>
  );
});

export type { SwitchProps };
export { Switch };
