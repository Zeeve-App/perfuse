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
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../core";
import { usePopoverContext } from "./PopoverContext";
import { useMergeRefs } from "@/hooks";

type PopoverButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C>;

type PopoverButtonComponent = <C extends React.ElementType = typeof Button>(
  props: PopoverButtonProps<C>,
) => React.ReactNode;

const PopoverButton: PopoverButtonComponent = React.forwardRef(
  <C extends React.ElementType>({ as, children, ...rest }: PopoverButtonProps<C>, ref?: PolymorphicRef<C>) => {
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

export type { PopoverButtonProps };
export { PopoverButton };
