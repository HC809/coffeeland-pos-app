import { IOrder, IOrderAmounts, IOrderDetail } from './INewOrder';

export interface ISale {
  orderInfo: IOrder;
  orderAmounts: IOrderAmounts;
  orderDetail: IOrderDetail[];
}
