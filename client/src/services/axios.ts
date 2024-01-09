import Axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

interface Headers {
  [key: string]: string;
}

const baseURL = "http://127.0.0.1:8000"; // local server

const headers = {} as Headers;
const axios = Axios.create({
  baseURL: baseURL,
  headers: { ...headers, "Content-Type": "application/json" },
});

const refreshTokenFxn = async () => {
  window.sessionStorage.removeItem("token");
  toast.error("Your session has expired. Please login agian.");
  window.location.href = "/login";
};
axios.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    const token = sessionStorage.getItem("token");
    const fiscalYearId = sessionStorage.getItem("fiscalYear");
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
          fiscalyearid: fiscalYearId,
        },
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response: any) => {
    if (response.data.status === 401) {
      toast.error("Your session has expired. Please login agian.");
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("fiscalYear");
      window.sessionStorage.removeItem("fiscialYearName");
      window.location.href = "/login";
    }
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    if (error?.response?.data?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      refreshTokenFxn();
    }
    return Promise.reject(error);
  }
);
export default axios;
