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
import { HTMLMotionProps, motion, AnimatePresence } from "framer-motion";

import { useActiveAccordionContext } from "./ActiveAccordionContextProvider";
import { tx } from "@/utils/shared";

interface AccordionBodyProps extends HTMLMotionProps<"div"> {
  itemIndex?: number;
}

const AccordionBody = forwardRef<HTMLDivElement, AccordionBodyProps>((props, ref) => {
  const { className, itemIndex = 0, children, ...rest } = props;

  const { isExpanded } = useActiveAccordionContext();

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          className={tx("text-sm font-normal", className)}
          id={`accordion-${itemIndex}-content`}
          role="region"
          aria-labelledby={`accordion-${itemIndex}-header`}
          ref={ref}
          variants={{
            animate: { opacity: 1, height: "auto" },
            initial: { opacity: 0, height: 0 },
          }}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={{ duration: 0.3 }}
          {...rest}
          data-expanded={isExpanded}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

AccordionBody.displayName = "AccordionBody";
export { type AccordionBodyProps };
export { AccordionBody };
