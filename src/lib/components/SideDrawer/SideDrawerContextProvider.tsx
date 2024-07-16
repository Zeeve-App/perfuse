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

interface SideDrawerContextProps {
  placement?: "left" | "right" | "top" | "bottom";
}
const SideDrawerContext = createContext<SideDrawerContextProps | null>(null);
SideDrawerContext.displayName = "SideDrawerContext";

const SideDrawerContextConsumer = SideDrawerContext.Consumer;
const SideDrawerContextProvider = SideDrawerContext.Provider;

const useSideDrawerContext = () => {
  const context = useContext(SideDrawerContext);
  if (!context) {
    throw new Error("useSideDrawerContext must be used within SideDrawerContextProvider");
  }

  return context;
};

export { type SideDrawerContextProps, SideDrawerContext, SideDrawerContextConsumer, useSideDrawerContext };
export default SideDrawerContextProvider;
