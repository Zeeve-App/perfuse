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

import React, { forwardRef, Children, cloneElement, useMemo, useCallback } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

import { RemoveProperties } from "../core";
import { ActiveAccordionContext, ActiveAccordionContextProps } from "./ActiveAccordionContextProvider";
import { useAccordionContext } from "./AccordionContextProvider";

interface AccordionItemProps extends RemoveProperties<HTMLMotionProps<"div">, "children"> {
  isExpanded?: boolean;
  itemIndex?: number;
  children: React.ReactElement | React.ReactElement[];
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const { isExpanded, itemIndex = 0, className, children, ...rest } = props;

  const { activeIndex } = useAccordionContext();

  const _isExpanded = useCallback(() => {
    if (isExpanded !== undefined) return isExpanded;

    if (typeof activeIndex === "number") return activeIndex === itemIndex;
    else return activeIndex.includes(itemIndex);
  }, [isExpanded, activeIndex, itemIndex]);

  const contextValues = useMemo(
    (): ActiveAccordionContextProps => ({
      isExpanded: _isExpanded(),
    }),
    [activeIndex],
  );

  return (
    <ActiveAccordionContext.Provider value={contextValues}>
      <motion.div className={className} ref={ref} {...rest} data-expanded={_isExpanded()}>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            itemIndex,
          });
        })}
      </motion.div>
    </ActiveAccordionContext.Provider>
  );
});

AccordionItem.displayName = "AccordionItem";
export type { AccordionItemProps };
export { AccordionItem };
