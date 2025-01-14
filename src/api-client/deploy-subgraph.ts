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
import { DeploySubgraphApiPayload } from "@/app/(protected)/api/network/[id]/deploy-subgraph/route";

type ApiResponse = {
  /** success status false if there is a error */
  success: boolean;
  /** response data of the api */
  data: Record<string, never>;
};

/** hook to deploy subgraph */
const useDeploySubgraph = (
  networkId: string,
  formData: DeploySubgraphApiPayload,
  config?: AxiosRequestConfig<DeploySubgraphApiPayload>,
) => {
  const request = backendAxiosInstance.post<ApiResponse, AxiosResponse<ApiResponse>, DeploySubgraphApiPayload>;
  /** Api endpoint for getting the data */
  const apiEndpoint = withBasePath(`/api/network/${networkId}/deploy-subgraph`);

  return request(apiEndpoint, formData, config);
};

export default useDeploySubgraph;
