import { backendAxiosInstance } from "@/utils/axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFetcher = (method?: "get" | "post", data?: any) => {
  if (method === "post") {
    const fetcher = (url: string) => backendAxiosInstance.post(url, data).then((res) => res.data);
    return fetcher;
  }

  const fetcher = (url: string) => backendAxiosInstance.get(url).then((res) => res.data);
  return fetcher;
};

export default useFetcher;
