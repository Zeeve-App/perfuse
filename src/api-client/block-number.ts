import useSWR from "swr";
import useFetcher from "@/hooks/use-fetcher";
import { withBasePath } from "@/utils/helpers";
import { useNetworkStore } from "@/store/network";

/** interface declaration of network list API response payload */
interface BlockHeightResponsePayload {
  jsonrpc: string;
  result: Result;
  id: number;
}

interface Result {
  block: Block;
  justifications: null;
}

interface Block {
  header: Header;
  extrinsics: string[];
}

interface Header {
  parentHash: string;
  number: string;
  stateRoot: string;
  extrinsicsRoot: string;
  digest: Digest;
}

interface Digest {
  logs: string[];
}

const apiEndpoint = withBasePath("/api/block-height");

/** hook to use network list api */
const useBlockNumberApi = () => {
  const fetcher = useFetcher();
  const netInfo = useNetworkStore((e) => e.networkInfo);

  const request = useSWR<BlockHeightResponsePayload, Record<string, string>>(
    netInfo.data?.networkId ? apiEndpoint : undefined,
    fetcher,
    {
      shouldRetryOnError: false,
    },
  );

  return request;
};

export type { BlockHeightResponsePayload };
export default useBlockNumberApi;
