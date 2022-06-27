import { AxiosResponse } from 'axios';
import { IApiResponse } from 'src/models/shared/IApiResponse';
import axiosNoTokenApiInstance from 'src/api/axiosNoTokenInstance';
import { IPOSData } from '../models/Authentication/IPOSData';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: any) =>
    axiosNoTokenApiInstance.get(url, { params: params }).then(responseBody),
  post: (url: string, body: {}) =>
    axiosNoTokenApiInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axiosNoTokenApiInstance.put(url, body).then(responseBody),
  del: (url: string) => axiosNoTokenApiInstance.delete(url).then(responseBody),
};

export interface IPOSDataApiResponse extends IApiResponse {
  data: IPOSData;
}

const ApiService = {
  validateInvoicePoint(id: number): Promise<IPOSDataApiResponse> {
    return requests.get(`auth/validateInvoicePoint/${id}`);
  },
};

export default ApiService;
