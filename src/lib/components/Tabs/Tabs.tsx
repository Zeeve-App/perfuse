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

import React, { forwardRef, useMemo, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { VariantProps, cva } from "class-variance-authority";
import { TabsContextProps, TabsContextProvider } from "./TabsContext";
import { tx } from "@/utils/shared";

const styles = cva("flex overflow-hidden rounded-lg border border-brand-outline bg-white", {
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
});

interface TabsProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof styles>,
    Pick<TabsContextProps, "activeTabClassName"> {
  orientation: "vertical" | "horizontal";
  defaultIndex?: number;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const { orientation, className, activeTabClassName, children, defaultIndex = 0, ...rest } = props;

  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

  const values: TabsContextProps = useMemo(
    () => ({
      orientation,
      activeIndex,
      setActiveIndex,
      activeTabClassName,
    }),
    [orientation, activeIndex, setActiveIndex, activeTabClassName],
  );

  return (
    <TabsContextProvider value={values}>
      <motion.div className={tx(styles({ orientation, className }))} ref={ref} {...rest}>
        {children}
      </motion.div>
    </TabsContextProvider>
  );
});

Tabs.displayName = "Tabs";
export type { TabsProps };
export { Tabs };
