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
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { tx } from "@/utils/shared";

/** Avatar component props */
type AvatarProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    className?: string;
  }
>;

/** avatar component type */
type AvatarComponent = <C extends React.ElementType = "img">(props: AvatarProps<C>) => React.ReactNode;

/** avatar component */
const Avatar: AvatarComponent = forwardRef(
  <C extends React.ElementType>({ as, className, ...rest }: AvatarProps<C>, ref?: PolymorphicRef<C>) => {
    const Component = as ?? "img";

    return (
      <Component
        className={tx(
          "h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-brand-cyan to-brand-teal object-cover",
          className,
        )}
        role="img"
        ref={ref}
        {...rest}
      />
    );
  },
);

export type { AvatarProps };
export { Avatar };
