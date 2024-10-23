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

type TypographyProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    className?: string;
    variant?: string;
  }
> &
  VariantProps<typeof styles>;

type TypographyComponent = <C extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h2">(
  props: TypographyProps<C>,
) => React.ReactNode;

const styles = cva(
  "font-poppins font-semibold text-theme-primary-content", // common
  {
    variants: {
      variant: {
        heading: "text-sm font-normal text-[#9A9A9A]",
        subtitle: "font-semibold text-theme-primary-content",
        paragraph: "text-sm font-normal text-theme-primary-content",
        title: "text-lg font-normal text-theme-primary-content",
        default: "",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

const Typography: TypographyComponent = forwardRef(
  <C extends React.ElementType>(
    { className, children, variant = "default", ...rest }: TypographyProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = "p";

    return (
      <Component
        // className={tx("font-poppins font-normal text-theme-primary-content", className)}
        className={tx(styles({ variant, className }))}
        ref={ref}
        role="heading"
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

export type { TypographyProps };
export { Typography };
