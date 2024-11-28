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

import { AxiosRequestConfig, AxiosResponse } from "axios";
import { backendAxiosInstance } from "@/utils/axios";
import { withBasePath } from "@/utils/helpers";

type ApiResponse =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any;

const useFileApi = async (file: string, config?: AxiosRequestConfig<FormData>) => {
  /** endpoint to get static files from server from public/output folder */
  const apiEndpoint = withBasePath(`/api/file/${file}`);
  const request = backendAxiosInstance.get<ApiResponse, AxiosResponse<ApiResponse>>;

  return request(apiEndpoint, { ...config });
};

export default useFileApi;
