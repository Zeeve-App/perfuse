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

import React, { forwardRef } from "react";

import { Button, ButtonProps } from "../Button";
import { RemoveProperties } from "../core";
import { useAccordionContext } from "./AccordionContextProvider";
import { useActiveAccordionContext } from "./ActiveAccordionContextProvider";
import { tx } from "@/utils/shared";
import SvgChevronDownSquare from "@/lib/icons/arrows/outline/ChevronDownSquare";

interface AccordionHeaderProps extends RemoveProperties<ButtonProps, "iconLeft" | "iconRight"> {
  itemIndex?: number;
  iconCollapsed?: React.ReactElement;
  iconExpanded?: React.ReactElement;
}

const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>((props, ref) => {
  const { className, itemIndex = 0, children, onClick, iconCollapsed, iconExpanded, ...rest } = props;

  const { toggleAccordion } = useAccordionContext();
  const { isExpanded } = useActiveAccordionContext();

  // set icons for collapsed and expanded state
  const _icon = isExpanded ? iconExpanded : iconCollapsed;
  const icon = _icon ? (
    _icon
  ) : (
    <SvgChevronDownSquare
      height={24}
      width={24}
      className={`${isExpanded ? "-rotate-180" : ""} text-brand-dark-blue transition-all duration-200`}
    />
  );

  return (
    <Button
      className={tx("flex justify-between rounded-none border-none bg-transparent hover:bg-slate-200 ", className)}
      iconRight={icon}
      onClick={(event) => {
        toggleAccordion(itemIndex);
        if (onClick) onClick(event);
      }}
      variant="ghost"
      colorScheme="dark"
      isFullWidth
      ref={ref}
      data-expanded={isExpanded}
      {...rest}
    >
      {children}
    </Button>
  );
});

AccordionHeader.displayName = "AccordionHeader";
export type { AccordionHeaderProps };
export { AccordionHeader };
