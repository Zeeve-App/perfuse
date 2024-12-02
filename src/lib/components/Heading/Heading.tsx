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
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

/** heading props */
type HeadingProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    className?: string;
  }
>;

/** heading component type */
type HeadingComponent = <C extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h2">(
  props: HeadingProps<C>,
) => React.ReactNode;

/** heading component */
const Heading: HeadingComponent = forwardRef(
  <C extends React.ElementType>({ as, className, children, ...rest }: HeadingProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "h2";

    return (
      <Component
        className={tx("font-poppins font-semibold text-theme-primary-content", className)}
        ref={ref}
        role="heading"
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

export type { HeadingProps };
export { Heading };
