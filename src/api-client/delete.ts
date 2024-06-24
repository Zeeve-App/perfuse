import { AxiosRequestConfig, AxiosResponse } from "axios";
import { backendAxiosInstance } from "@/utils/axios";
import { withBasePath } from "@/utils/helpers";

type ApiResponse = {
  success: boolean;
  data: { path: string };
};

const useDeleteApi = async (networkId: string, config?: AxiosRequestConfig<FormData>) => {
  const apiEndpoint = withBasePath(`/api/network/${networkId}/delete`);
  const request = backendAxiosInstance.get<ApiResponse, AxiosResponse<ApiResponse>>;

  return request(apiEndpoint, config);
};

export default useDeleteApi;
