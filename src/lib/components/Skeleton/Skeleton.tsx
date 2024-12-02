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
import React from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

type SkeletonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C>;

type SkeletonComponent = <C extends React.ElementType = "div">(props: SkeletonProps<C>) => React.ReactNode;

const Skeleton: SkeletonComponent = React.forwardRef(
  <C extends React.ElementType>({ as, className, children, ...rest }: SkeletonProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "div";

    return (
      <Component role="status" className={tx("animate-pulse", className)} ref={ref} {...rest}>
        {children}
      </Component>
    );
  },
);

export type { SkeletonProps };
export { Skeleton };
