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

import { createContext, useCallback, useContext } from "react";

/** Accordion context props */
interface AccordionContextProps {
  activeIndex: number | number[];
  setActiveIndex: (idx: number | number[] | ((prevState: number | number[]) => number | number[])) => void;
  shouldAllowMultiple?: boolean;
}

const AccordionContext = createContext<AccordionContextProps | null>(null);
AccordionContext.displayName = "AccordionContext";

const AccordionContextConsumer = AccordionContext.Consumer;
const AccordionContextProvider = AccordionContext.Provider;

/** accordion context hooks */
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (context === null) {
    throw new Error("useAccordionContext can only be used within the <Accordion />.");
  }

  const { activeIndex, setActiveIndex, shouldAllowMultiple } = context;

  const toggleAccordion = useCallback(
    (index: number) => {
      if (!shouldAllowMultiple) {
        if (typeof activeIndex === "object") {
          setActiveIndex(index);
        } else {
          if (activeIndex === index) {
            setActiveIndex(-1);
          } else {
            setActiveIndex(index);
          }
        }
      } else {
        if (typeof activeIndex === "number") {
          setActiveIndex([index]);
        } else {
          if (!activeIndex.includes(index)) {
            setActiveIndex([...activeIndex, index]);
          } else {
            setActiveIndex(activeIndex.filter((idx) => idx !== index));
          }
        }
      }
    },
    [shouldAllowMultiple, activeIndex, setActiveIndex],
  );

  return { ...context, toggleAccordion };
};

export { type AccordionContextProps, AccordionContext, AccordionContextConsumer, useAccordionContext };
export default AccordionContextProvider;
