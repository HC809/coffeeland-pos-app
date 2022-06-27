import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: AxiosError) => {
  let descriptionMessage: string = error.response?.data;
  return descriptionMessage ?? error?.message ?? "Error desconocido";
};
