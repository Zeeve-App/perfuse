/* eslint-disable react/display-name */
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

import React from "react";
import { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

/** badges component props */
type BadgeProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    className?: string;
    variant?: string;
  }
> &
  VariantProps<typeof styles>;

/** badge component type */
type BadgeComponent = <C extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h2">(
  props: BadgeProps<C>,
) => React.ReactNode;

/** variants of the component */
const styles = cva(
  /** class in all variants */
  "rounded-2xl bg-theme-background px-4 font-poppins text-theme-secondary ",
  {
    variants: {
      variant: {
        /** green variant */
        green: "border border-[#064232] bg-brand-green text-[#064232]",
        /** purple variant */
        purple: "border border-theme-secondary bg-[#A619F71C] text-theme-secondary",
        /** red variant */
        red: "border border-[#FF2828] bg-[#FF282812] text-[#FF2828]",
        /** default variant */
        default: "dark:text-white",
      },
    },

    /** setting the default variants */
    defaultVariants: {
      variant: "default",
    },
  },
);

/** badge components */
const Badge: BadgeComponent = forwardRef(
  <C extends React.ElementType>(
    { className, children, variant = "default", ...rest }: BadgeProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    return (
      <span className={tx(styles({ variant, className }))} ref={ref} {...rest}>
        {children}
      </span>
    );
  },
);

export type { BadgeProps };
export { Badge };
