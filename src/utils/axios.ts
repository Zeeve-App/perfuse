import axios from "axios";

/** Axios instance for internal/current app's backend. */
const backendAxiosInstance = axios.create({
  baseURL: "",
});

export { backendAxiosInstance };
