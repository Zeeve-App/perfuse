import useSWR from "swr";
import useFetcher from "@/hooks/use-fetcher";
import { withBasePath } from "@/utils/helpers";

/** interface declaration of network list API response payload */
interface ResponsePayload {
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

  const request = useSWR<ResponsePayload, Record<string, string>>(apiEndpoint, fetcher, {
    shouldRetryOnError: false,
  });

  return request;
};

export type { ResponsePayload };
export default useBlockNumberApi;
