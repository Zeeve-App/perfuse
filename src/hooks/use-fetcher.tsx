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

import { backendAxiosInstance } from "@/utils/axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFetcher = (method?: "get" | "post", data?: any) => {
  if (method === "post") {
    const fetcher = (url: string) => backendAxiosInstance.post(url, data).then((res) => res.data);
    return fetcher;
  }

  const fetcher = (url: string) => backendAxiosInstance.get(url).then((res) => res.data);
  return fetcher;
};

export default useFetcher;
