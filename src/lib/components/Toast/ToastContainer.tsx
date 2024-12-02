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

import React, { useMemo, useState } from "react";
import { Portal } from "../Portal";
import { ToastContext, ToastContextProps } from "./ToastContextProvider";
import { ToastOptions, Toasts } from "./types";
import { ToastList } from "./ToastList";

interface ToastContainerProps extends React.ComponentPropsWithRef<"div"> {
  options?: ToastOptions;
}

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  const { children, options } = props;
  const [list, setList] = useState<Toasts>({
    "bottom-left": [],
    "bottom-right": [],
    "top-left": [],
    "top-right": [],
  });

  const contextValues: ToastContextProps = useMemo(
    () => ({
      toasts: list,
      setToasts: setList,
      options,
    }),
    [list, options],
  );

  return (
    <ToastContext.Provider value={contextValues}>
      {children}
      <Portal>
        <ToastList />
      </Portal>
    </ToastContext.Provider>
  );
};

ToastContainer.displayName = "ToastContainer";
export type { ToastContainerProps };
export { ToastContainer };
