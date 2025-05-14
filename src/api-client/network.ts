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

import useSWR from "swr";
import useFetcher from "@/hooks/use-fetcher";
import { withBasePath } from "@/utils/helpers";
import { NetworkDbRow } from "@/db-queries";
import { ChainSpecFileType } from "@/types/chain-spec";

/** interface declaration of network list API response payload */
interface ResponsePayload {
  success: boolean;
  data?: NetworkDbRow & { network_chain_spec_file_json: ChainSpecFileType };
}

/** hook to get the node info of a node */
const useNetworkApi = (networkId: string, includeChainSpec: boolean = false) => {
  const apiEndpoint = withBasePath(`/api/network/${networkId}?includeChainSpec=${includeChainSpec.toString()}`);
  const fetcher = useFetcher();

  const request = useSWR<ResponsePayload, Record<string, string>>(networkId ? apiEndpoint : undefined, fetcher, {
    shouldRetryOnError: false,
    refreshInterval: includeChainSpec ? 0 : 1000 * 20,
  });

  return request;
};

export default useNetworkApi;
