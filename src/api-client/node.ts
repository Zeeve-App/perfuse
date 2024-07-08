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
