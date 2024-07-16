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

type Count = {
  count: number;
};

type Notification = {
  heading: string;
  description: string;
  level: "success" | "error" | "info" | "warning";
  redirection?: {
    newTab: boolean;
    URL: string;
  };
  read: boolean;
  createdAt: string;
};

type Data = {
  Action: "Message";
  Type: "Count" | "Toast" | "AppNotification";
  Details: {
    id: string;
    data: Count | Notification | Notification[];
  };
};

export type { Count, Notification, Data };
