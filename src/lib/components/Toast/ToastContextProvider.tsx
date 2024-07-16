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

import { createContext } from "react";
import { ToastPosition, ToastStatus, ToastOptions, Toasts } from "./types";

const DEFAULT_TOAST_POSITION: ToastPosition = "bottom-right";
const DEFAULT_TOAST_STATUS: ToastStatus = "info";
const DEFAULT_TOAST_DURATION = 5000; // in ms, 1000ms = 1sec
const DEFAULT_TOAST_ID_LENGTH = 10;
const DEFAULT_TOAST_AUTOCLOSE = true;

const DEFAULT = {
  DEFAULT_TOAST_POSITION,
  DEFAULT_TOAST_STATUS,
  DEFAULT_TOAST_DURATION,
  DEFAULT_TOAST_ID_LENGTH,
  DEFAULT_TOAST_AUTOCLOSE,
};

interface ToastContextProps {
  toasts: Toasts;
  setToasts: (arg0: Toasts | ((prevState: Toasts) => Toasts)) => void;
  options?: ToastOptions;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export type { ToastContextProps };
export { DEFAULT, ToastContext };
