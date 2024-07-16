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

import React, { Children, cloneElement, forwardRef, useMemo, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

import { RemoveProperties } from "../core";
import AccordionContextProvider, { AccordionContextProps } from "./AccordionContextProvider";
import { tx } from "@/utils/shared";

interface AccordionProps
  extends RemoveProperties<HTMLMotionProps<"div">, "children">,
    RemoveProperties<AccordionContextProps, "activeIndex" | "setActiveIndex"> {
  children: React.ReactElement | React.ReactElement[];
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { className, children, shouldAllowMultiple, ...rest } = props;

  const [_activeIndex, _setActiveIndex] = useState<number | number[]>(-1);

  const contextValues = useMemo(
    (): AccordionContextProps => ({
      activeIndex: _activeIndex,
      setActiveIndex: _setActiveIndex,
      shouldAllowMultiple,
    }),
    [shouldAllowMultiple, _activeIndex],
  );

  return (
    <AccordionContextProvider value={contextValues}>
      <motion.div className={tx("divide-y overflow-hidden rounded-lg ", className)} ref={ref} {...rest}>
        {Children.map(children, (child, index) => {
          return cloneElement(child, {
            itemIndex: index,
          });
        })}
      </motion.div>
    </AccordionContextProvider>
  );
});

Accordion.displayName = "Accordion";
export type { AccordionProps };
export { Accordion };
