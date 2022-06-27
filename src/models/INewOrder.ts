import { OrderType } from '@/data/OrderTypes';

export interface INewOrder {
  started: boolean;
  finished: boolean;
  orderType: OrderType | null;
  invoiceNumber: number;
  ticketNumber: number | null;
  customerName: string;
  rtn: string | null;
}

export interface INewOrderAmounts {
  subtotal: number;
  totalTax15: number;
  totalTax18: number;
  totalExempt: number;
  totalExonerated: number;
  totalTax: number;
  total: number;
}

export interface INewOrderDetail {
  productId: number;
  productName: string;
  image?: string;
  categoryId: number;
  categoryName: string;
  taxId: number;
  taxName: string;
  sellingPrice: number;
  priceBeforeTax: number;
  quantity: number;
  taxAmount: number;
  subtotal: number;
  total: number;
}
