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

interface PopoverContextProps {
  isOpen: boolean;
  setReferenceElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setPopperElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  styles: {
    [key: string]: React.CSSProperties;
  };
  attributes: {
    [key: string]:
      | {
          [key: string]: string;
        }
      | undefined;
  };
}

const PopoverContext = createContext<PopoverContextProps | null>(null);
const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopoverContext must be used within <Popover />");
  }

  return context;
};

const PopoverContextConsumer = PopoverContext.Consumer;
const PopoverContextProvider = PopoverContext.Provider;

PopoverContext.displayName = "PopoverContext";
export type { PopoverContextProps };
export { PopoverContext, PopoverContextConsumer, PopoverContextProvider, usePopoverContext };
