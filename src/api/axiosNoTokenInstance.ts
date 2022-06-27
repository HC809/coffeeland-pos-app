import axios from "axios";

const { NEXT_PUBLIC_COFFEELAND_API_ENDPOINT } = process.env;

const axiosNoTokenApiInstance = axios.create();

axiosNoTokenApiInstance.defaults.baseURL = NEXT_PUBLIC_COFFEELAND_API_ENDPOINT;

const headers = {
  "Content-Type": "application/json",
};

axiosNoTokenApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = headers;

    return config;
  },
  (error) => {
    console.log(`Request Interceptor: ${error}`);
    Promise.reject(error);
  }
);

axiosNoTokenApiInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default axiosNoTokenApiInstance;
