import useSWR from "swr";
import useFetcher from "@/hooks/use-fetcher";

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

/** hook to use network list api */
const useBlockNumberApi = () => {
  const fetcher = useFetcher("post", {
    jsonrpc: "2.0",
    method: "chain_getBlock",
    params: [],
    id: 1,
  });

  const url = `http://localhost:9010`;
  const request = useSWR<ResponsePayload, Record<string, string>>(url, fetcher, {
    shouldRetryOnError: false,
  });

  return {
    url,
    request,
  };
};

export type { ResponsePayload };
export default useBlockNumberApi;
