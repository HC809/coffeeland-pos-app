import { AxiosResponse } from "axios";
// import axiosApiInstance from "./axiosInstance";
import axiosNoTokenApiInstance from "./axiosNoTokenInstance";

const responseBody = (response: AxiosResponse) => response.data;

// const axiosTokenRequests = {
//   get: (url: string) => axiosApiInstance.get(url).then(responseBody),
//   post: (url: string, body: {}) =>
//     axiosApiInstance.post(url, body).then(responseBody),
//   put: (url: string, body: {}) =>
//     axiosApiInstance.put(url, body).then(responseBody),
//   del: (url: string) => axiosApiInstance.delete(url).then(responseBody),
// };

const axiosNoTokenRequests = {
  get: (url: string) => axiosNoTokenApiInstance.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    axiosNoTokenApiInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axiosNoTokenApiInstance.put(url, body).then(responseBody),
  del: (url: string) => axiosNoTokenApiInstance.delete(url).then(responseBody),
};

export {  axiosNoTokenRequests };
