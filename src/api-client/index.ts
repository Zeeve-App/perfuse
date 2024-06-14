import useBlockNumberApi from "./block-number";
import useCreateNetworkApi from "./create-network";
import useUploadApi from "./upload";

const useApi = () => ({
  uploadApi: useUploadApi,
  createNetwork: useCreateNetworkApi,
  blockNumber: useBlockNumberApi,
});

export default useApi;
