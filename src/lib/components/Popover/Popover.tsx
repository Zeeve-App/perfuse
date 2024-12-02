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

import React, { useMemo, useState } from "react";
import { Modifier, usePopper } from "react-popper";
import { Placement, PositioningStrategy } from "@popperjs/core";
import { PopoverContextProps, PopoverContextProvider } from "./PopoverContext";

/** popover props */
interface PopoverProps {
  children: React.ReactNode;
  isOpen: boolean;
  /** popover placement */
  placement?: Placement;
  /** positioning strategy */
  strategy?: PositioningStrategy;
  /** modifiers */
  modifiers?: Array<Partial<Modifier<string, object>>>;
}

/** popover component */
const Popover = (props: PopoverProps) => {
  const { isOpen, placement = "auto", strategy = "fixed", modifiers, children } = props;

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  /** calling popover hook */
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy,
    modifiers,
  });

  const values: PopoverContextProps = useMemo(() => {
    return {
      isOpen,
      setReferenceElement,
      setPopperElement,
      styles,
      attributes,
    };
  }, [isOpen, setReferenceElement, setPopperElement, styles, attributes]);

  return <PopoverContextProvider value={values}>{children}</PopoverContextProvider>;
};

export type { PopoverProps };
export { Popover };
