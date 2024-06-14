import useBlockNumberApi from "./block-number";
import useCreateNetworkApi from "./create-network";
import useDeleteApi from "./delete";
import useUploadApi from "./upload";

const useApi = () => ({
  uploadApi: useUploadApi,
  createNetwork: useCreateNetworkApi,
  blockNumber: useBlockNumberApi,
  delete: useDeleteApi,
});

export default useApi;
