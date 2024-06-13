import { AxiosRequestConfig, AxiosResponse } from "axios";
import { backendAxiosInstance } from "@/utils/axios";
import { withBasePath } from "@/utils/helpers";
import { CreatePerfuseApiPayload } from "@/app/api/create/route";

type ApiRequest = CreatePerfuseApiPayload;
type ApiResponse = {
  success: boolean;
  data: { network_id: string };
};

const apiEndpoint = withBasePath("/api/create");

const useCreateNetworkApi = async (formData: ApiRequest, config?: AxiosRequestConfig<ApiRequest>) => {
  const request = backendAxiosInstance.post<ApiResponse, AxiosResponse<ApiResponse>, ApiRequest>;

  return request(apiEndpoint, formData, config);
};

export default useCreateNetworkApi;
