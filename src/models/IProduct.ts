export interface IProduct {
  id: number;
  name: string;
  description: string;
  barcode?: string;
  hasModifiers: boolean;
  sellingPrice: number;
  priceBeforeTax: number;
  productTypeId: number;
  productType?: string;
  categoryId: number;
  category?: string;
  taxRateId: number;
  taxRate?: string;
  isActive: boolean;
  image?: string;
}

