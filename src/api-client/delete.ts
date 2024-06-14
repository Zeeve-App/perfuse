import { AxiosRequestConfig, AxiosResponse } from "axios";
import { backendAxiosInstance } from "@/utils/axios";
import { withBasePath } from "@/utils/helpers";

type ApiRequest = FormData;
type ApiResponse = {
  success: boolean;
  data: { path: string };
};

const useDeleteApi = async (networkId: string, config?: AxiosRequestConfig<FormData>) => {
  const apiEndpoint = withBasePath(`/api/${networkId}/delete`);
  const request = backendAxiosInstance.get<ApiResponse, AxiosResponse<ApiResponse>>;

  return request(apiEndpoint, config);
};

export default useDeleteApi;
