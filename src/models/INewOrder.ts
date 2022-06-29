import { OrderType } from '@/data/OrderTypes';

export interface IOrder {
  started: boolean;
  finished: boolean;
  orderType: OrderType | null;
  cai: string;
  invoiceNumber: number;
  limitDate: Date | null;
  range: string;
  ticketNumber: number | null;
  customerName: string;
  rtn: string | null;
  date: Date | null;
}

export interface IOrderAmounts {
  subtotal: number;
  totalTax15: number;
  totalTax18: number;
  totalExempt: number;
  totalExonerated: number;
  taxableAmount15: number;
  taxableAmount18: number;
  totalTax: number;
  total: number;
}

export interface IOrderDetail {
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
