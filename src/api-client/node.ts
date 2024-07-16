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
import { NodeDbRow } from "@/db-queries";

/** interface declaration of network list API response payload */
interface ResponsePayload {
  success: boolean;
  data?: NodeDbRow;
}

/** hook to use network list api */
const useNodeApi = (networkId: string, nodeId: string) => {
  const apiEndpoint = withBasePath(`/api/network/${networkId}/node/${nodeId}`);
  const fetcher = useFetcher();

  const request = useSWR<ResponsePayload, Record<string, string>>(
    networkId && nodeId ? apiEndpoint : undefined,
    fetcher,
    {
      shouldRetryOnError: false,
    },
  );

  return request;
};

export default useNodeApi;
