import useCreateNetworkApi from "./create-network";
import useUploadApi from "./upload";

const useApi = () => ({
  uploadApi: useUploadApi,
  createNetwork: useCreateNetworkApi,
});

export default useApi;
