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

import { ReactElement } from "react";
import { HTMLMotionProps } from "framer-motion";

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type ToastStatus = "info" | "warning" | "success" | "error" | "neutral";

type ToastOptions = {
  status?: ToastStatus;
  position?: ToastPosition;
  duration?: number;
  shouldAutoClose?: boolean;
  shouldHideCloseButton?: boolean;
};

type ToastInstance = {
  title: string | ReactElement;
  options?: {
    message?: string;
    icon?: ReactElement;
    toastProps?: HTMLMotionProps<"div">;
  } & ToastOptions;
  id: string;
  createdAt: number;
  callbackRefs: NodeJS.Timeout | null;
};

type Toasts = {
  [position in ToastPosition]: ToastInstance[];
};

export type { ToastPosition, ToastStatus, ToastOptions, ToastInstance, Toasts };
