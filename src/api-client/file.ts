import { AxiosRequestConfig, AxiosResponse } from "axios";
import { backendAxiosInstance } from "@/utils/axios";
import { withBasePath } from "@/utils/helpers";

type ApiResponse =
  | {
      success: boolean;
      data: { wasm: string; genesis: string };
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any;

const useFileApi = async (file: string, config?: AxiosRequestConfig<FormData>) => {
  const apiEndpoint = withBasePath(`/output/${file}`);
  const request = backendAxiosInstance.get<ApiResponse, AxiosResponse<ApiResponse>>;

  return request(apiEndpoint, { ...config });
};

export default useFileApi;
