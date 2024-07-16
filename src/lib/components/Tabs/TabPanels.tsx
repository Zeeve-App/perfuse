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

import React, { Children, forwardRef, useMemo } from "react";
import { useTabsContext } from "./TabsContext";
import { tx } from "@/utils/shared";

interface TabPanelsProps extends React.ComponentPropsWithRef<"div"> {
  children?: React.ReactElement | React.ReactElement[];
}

const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { activeIndex } = useTabsContext();

  const activeTab = useMemo(
    () => Children.map(children, (child, index) => (index === activeIndex ? child : null)),
    [children, activeIndex],
  );

  return (
    <div className={tx("w-full", className)} ref={ref} {...rest}>
      {activeTab}
    </div>
  );
});

TabPanels.displayName = "TabPanels";
export type { TabPanelsProps };
export { TabPanels };
