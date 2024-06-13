import { AxiosRequestConfig, AxiosResponse } from "axios";
import { backendAxiosInstance } from "@/utils/axios";
import { withBasePath } from "@/utils/helpers";

type ApiRequest = FormData;
type ApiResponse = {
  success: boolean;
  data: { path: string };
};

const apiEndpoint = withBasePath("/api/upload");

const useUploadApi = async (formData: ApiRequest, config: AxiosRequestConfig<FormData>) => {
  const request = backendAxiosInstance.post<ApiResponse, AxiosResponse<ApiResponse>, ApiRequest>;

  return request(apiEndpoint, formData, config);
};

export default useUploadApi;
