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

import { createContext, useContext } from "react";

interface TabsContextProps {
  orientation: "vertical" | "horizontal";
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  /** CSS classes for active tab. */
  activeTabClassName?: string;
}

const TabsContext = createContext<TabsContextProps | null>(null);
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext can only be used within the <Tabs />.");
  }

  return context;
};

const TabsContextConsumer = TabsContext.Consumer;
const TabsContextProvider = TabsContext.Provider;

TabsContext.displayName = "TabsContext";
export type { TabsContextProps };
export { TabsContext, TabsContextConsumer, TabsContextProvider, useTabsContext };
