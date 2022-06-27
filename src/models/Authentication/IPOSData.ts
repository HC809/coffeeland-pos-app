import { IProduct } from '../IProduct';
import { ICategory } from '../ICategory';
import { IInvoiceRange } from '../IInvoiceRange';
import { IInvoicePoint } from '../IInvoicePoint';
import { IGeneralInfo } from '../IGeneralInfo';

export interface IPOSData {
  generalInfo: IGeneralInfo;
  invoicePoint: IInvoicePoint;
  invoiceRangeInUse: IInvoiceRange;
  invoiceRangePending: IInvoiceRange;
  categories: ICategory[];
  products: IProduct[];
}
