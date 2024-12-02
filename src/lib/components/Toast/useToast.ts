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

import { useCallback, useContext } from "react";
import { useToastHandler } from "./useToastHandler";
import { ToastInstance } from "./types";
import { ToastContext } from "./ToastContextProvider";

const useToast = () => {
  const context = useContext(ToastContext);

  if (context === null) throw new Error("useToast can only be used within the <ToastContainer />.");

  const { addToast } = useToastHandler();

  const toast = useCallback((title: ToastInstance["title"], options?: ToastInstance["options"]) => {
    return addToast({
      title,
      options,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return toast;
};

export { useToast };
