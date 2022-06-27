import { AxiosResponse } from "axios";
import { IApiResponse } from "src/models/shared/IApiResponse";
import axiosNoTokenApiInstance from "src/api/axiosNoTokenInstance";

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

export interface ISingleApiResponse<T> extends IApiResponse {
  data: T;
}

export interface IListApiResponse<T> extends IApiResponse {
  data: T[];
}

class ApiGenericService<T> {
  getAll(endpoint: string, params?: any): Promise<IListApiResponse<T>> {
    return requests.get(`/${endpoint}/getAll`, params);
  }
  getById(endpoint: string, id: number): Promise<ISingleApiResponse<T>> {
    return requests.get(`/${endpoint}/getById/${id}`);
  }
  create(endpoint: string, body: T): Promise<ISingleApiResponse<T>> {
    return requests.post(`/${endpoint}/create`, body);
  }
  update(endpoint: string, body: T): Promise<ISingleApiResponse<T>> {
    return requests.put(`/${endpoint}/update`, body);
  }
  delete(endpoint: string, id: number): Promise<ISingleApiResponse<T>> {
    return requests.del(`/${endpoint}/delete/${id}`);
  }
}

export { ApiGenericService };
