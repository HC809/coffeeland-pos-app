// import { IReactSelectOption } from "./ReactSelect.models";

export class IApiResponse {
  success: boolean;
  message: string;
  errorMessage: string;
  data: any;
  constructor(newItem: IApiResponse) {
    this.success = newItem?.success ?? null;
    this.message = newItem?.message ?? null;
    this.errorMessage = newItem?.errorMessage ?? null;
    this.data = newItem?.data ?? null;
  }
}

// export interface IReactSelectApiResponse extends IApiResponse {
//   data: IReactSelectOption[];
// }
