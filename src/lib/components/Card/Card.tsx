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
import { cva, VariantProps } from "class-variance-authority";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

const styles = cva(
  "", // common
  {
    variants: {
      variant: {
        grid: "grid grid-cols-12 gap-3 p-3 ",
        "grid-no-pad": "grid grid-cols-12 gap-3",
        default:
          "grid grid-cols-12 gap-3 rounded-lg border border-brand-outline bg-theme-foreground p-3 text-brand-dark lg:p-4",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

type CardProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C> & VariantProps<typeof styles>;

type CardComponent = <C extends React.ElementType = "div">(props: CardProps<C>) => React.ReactNode;

const Card: CardComponent = forwardRef(
  <C extends React.ElementType>({ as, className, children, ...rest }: CardProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "div";

    const { variant } = rest;

    return (
      <Component className={tx(styles({ variant, className }))} {...rest} ref={ref}>
        {children}
      </Component>
    );
  },
);

export type { CardProps };
export { Card };
