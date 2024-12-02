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

import React, { ComponentPropsWithRef, MutableRefObject, forwardRef, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Placement, PositioningStrategy } from "@popperjs/core";
import { PopoverContextProps, PopoverContextProvider } from "../Popover";
import { useOnClickOutside } from "@/hooks";

/** dropdown menu props */
interface DropdownMenuProps extends ComponentPropsWithRef<"div"> {
  /** is dropdown menu open? */
  isOpen: boolean;
  /** action to perform on close */
  onClose: () => void;
  /** dropdown menu placement
   * @default "bottom-end"
   */
  placement?: Placement;
  /** positioning strategy */
  strategy?: PositioningStrategy;
}

/** dropdown menu component */
const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>((props, ref) => {
  const { isOpen, onClose, placement = "bottom-end", strategy, children, ...rest } = props;

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy,
  });

  const localRef = useRef(null);
  const dropdownMenuRef = ref ?? localRef;
  useOnClickOutside(dropdownMenuRef as MutableRefObject<HTMLDivElement>, onClose);

  /** popover context props values */
  const values: PopoverContextProps = useMemo(() => {
    return {
      isOpen,
      setReferenceElement,
      setPopperElement,
      styles,
      attributes,
    };
  }, [isOpen, setReferenceElement, setPopperElement, styles, attributes]);

  return (
    <PopoverContextProvider value={values}>
      <div ref={dropdownMenuRef} {...rest}>
        {children}
      </div>
    </PopoverContextProvider>
  );
});

DropdownMenu.displayName = "DropdownMenu";
export type { DropdownMenuProps };
export { DropdownMenu };
