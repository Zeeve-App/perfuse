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
import { withBasePath } from "@/utils/helpers";
import { backendAxiosInstance } from "@/utils/axios";

type ApiRequest = {
  key: string;
};
type ApiResponse = {
  success: boolean;
  data: { network_id: string };
};

/** hook to use network list api */
const useAddKey = (
  networkId: string,
  nodeId: string,
  formData: ApiRequest,
  config?: AxiosRequestConfig<ApiRequest>,
) => {
  const request = backendAxiosInstance.post<ApiResponse, AxiosResponse<ApiResponse>, ApiRequest>;
  const apiEndpoint = withBasePath(`/api/network/${networkId}/node/${nodeId}/add-key`);

  return request(apiEndpoint, formData, config);
};

export default useAddKey;
