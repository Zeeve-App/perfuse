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
import { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

type BadgeProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    className?: string;
    variant?: string;
  }
> &
  VariantProps<typeof styles>;

type BadgeComponent = <C extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h2">(
  props: BadgeProps<C>,
) => React.ReactNode;

const styles = cva(
  "rounded-2xl bg-theme-background px-4 font-poppins text-theme-secondary ", // common
  {
    variants: {
      variant: {
        green: "border border-[#064232] bg-brand-green text-[#064232]",
        purple: "border border-theme-secondary bg-[#A619F71C] text-theme-secondary",
        default: "dark:text-white",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

const Badge: BadgeComponent = forwardRef(
  <C extends React.ElementType>(
    { className, children, variant = "default", ...rest }: BadgeProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    return (
      <span
        // className={tx("font-spanoppins font-normal text-theme-primary-content", className)}
        className={tx(styles({ variant, className }))}
        ref={ref}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

export type { BadgeProps };
export { Badge };
