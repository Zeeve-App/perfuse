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
import { Button } from "../Button";
import { usePopoverContext } from "../Popover";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { useMergeRefs } from "@/hooks";

/** dropdown menu button props */
type DropdownMenuButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C>;

/** dropdown menu button component type */
type DropdownMenuButtonComponent = <C extends React.ElementType = typeof Button>(
  props: DropdownMenuButtonProps<C>,
) => React.ReactNode;

/** dropdown menu button component */
const DropdownMenuButton: DropdownMenuButtonComponent = React.forwardRef(
  <C extends React.ElementType>({ as, children, ...rest }: DropdownMenuButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const { setReferenceElement } = usePopoverContext();
    const refs = useMergeRefs(ref, setReferenceElement);

    const Component = as ?? Button;

    return (
      <Component ref={refs} {...rest}>
        {children}
      </Component>
    );
  },
);

export type { DropdownMenuButtonProps };
export { DropdownMenuButton };
