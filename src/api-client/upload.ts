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

type ApiRequest = FormData;
type ApiResponse = {
  success: boolean;
  data: { path: string };
};

/** endpoint to upload a file in the server */
const apiEndpoint = withBasePath("/api/upload");

/** hook to upload a file in the server */
const useUploadApi = async (formData: ApiRequest, config: AxiosRequestConfig<FormData>) => {
  const request = backendAxiosInstance.post<ApiResponse, AxiosResponse<ApiResponse>, ApiRequest>;

  return request(apiEndpoint, formData, config);
};

export default useUploadApi;
