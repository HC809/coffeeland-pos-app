import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  INewOrder,
  INewOrderAmounts,
  INewOrderDetail,
} from '../models/INewOrder';
import { RootState } from './store';
import { OrderType } from '../data/OrderTypes';

interface NewOrderType {
  orderType: OrderType;
  customerName: string;
  rtn: string;
  ticketNumber: number;
}

interface NewOrderState {
  newOrderInfo: INewOrder;
  newOrderAmounts: INewOrderAmounts;
  newOrderDetail: INewOrderDetail[];
}

const initialState: NewOrderState = {
  newOrderInfo: {
    customerName: 'Consumidor Final',
    rtn: '',
    invoiceNumber: 0,
    orderType: null,
    ticketNumber: null,
    started: false,
    finished: false,
  },
  newOrderAmounts: {
    subtotal: 0,
    totalTax15: 0,
    totalTax18: 0,
    totalExempt: 0,
    totalExonerated: 0,
    totalTax: 0,
    total: 0,
  },
  newOrderDetail: [],
};

const calculateTotalOrderAmounts = (
  newOrderDetail: INewOrderDetail[]
): INewOrderAmounts => {
  let amounts = {
    subtotal: 0.0,
    totalTax: 0.0,
    total: 0.0,
  };

  let totalExemptTax = 0;
  newOrderDetail
    .filter((item) => item.taxName === 'Exento')
    .map((x: INewOrderDetail) => {
      totalExemptTax = totalExemptTax + x.sellingPrice;
    });

  let totalExoneratedTax = 0;
  newOrderDetail
    .filter((item) => item.taxName === 'Exonerado')
    .map((x: INewOrderDetail) => {
      totalExoneratedTax = totalExoneratedTax + x.sellingPrice;
    });

  let totalTax15 = 0;
  newOrderDetail
    .filter((item) => item.taxName === 'ISV 15%')
    .map((x: INewOrderDetail) => {
      totalTax15 = (totalTax15 + x.taxAmount) * x.quantity;
    });

  let totalTax18 = 0;
  newOrderDetail
    .filter((item) => item.taxName === 'ISV 18%')
    .map((x: INewOrderDetail) => {
      totalTax18 = (totalTax18 + x.taxAmount) * x.quantity;
    });

  newOrderDetail.map((item: INewOrderDetail) => {
    amounts.subtotal += item.subtotal;
    amounts.totalTax += item.taxAmount;
    amounts.total += item.total;
  });

  return {
    subtotal: amounts.subtotal,
    totalTax15: totalTax15,
    totalTax18: totalTax18,
    totalExempt: totalExemptTax,
    totalExonerated: totalExoneratedTax,
    totalTax: amounts.totalTax,
    total: amounts.total,
  };
};

export const incremenetProductQuantity = (product: INewOrderDetail) => {
  let newQuantity = product.quantity + 1;

  let updatedProduct: INewOrderDetail = {
    ...product,
    quantity: newQuantity,
    subtotal: newQuantity * product.priceBeforeTax,
    taxAmount: product.sellingPrice - product.priceBeforeTax,
    total: newQuantity * product.sellingPrice,
  };

  return updatedProduct;
};

export const decrementProductQuantity = (product: INewOrderDetail) => {
  let newQuantity = product.quantity - 1;

  let updatedProduct: INewOrderDetail = {
    ...product,
    quantity: newQuantity,
    subtotal: newQuantity * product.priceBeforeTax,
    taxAmount: product.sellingPrice - product.priceBeforeTax,
    total: newQuantity * product.sellingPrice,
  };

  return updatedProduct;
};

const newOrderSlice = createSlice({
  name: 'NewOrder',
  initialState,
  reducers: {
    setNewOrderType: (state, action: PayloadAction<NewOrderType>) => {
      state.newOrderInfo.orderType = action.payload.orderType;
      state.newOrderInfo.customerName = action.payload.customerName;
      state.newOrderInfo.rtn = action.payload.rtn;
      state.newOrderInfo.ticketNumber = action.payload.ticketNumber;
      state.newOrderInfo.started = true;
    },
    cancelNewOrder: (state) => {
      state.newOrderInfo.orderType = initialState.newOrderInfo.orderType;
      state.newOrderInfo.customerName = initialState.newOrderInfo.customerName;
      state.newOrderInfo.rtn = initialState.newOrderInfo.rtn;
      state.newOrderInfo.ticketNumber = initialState.newOrderInfo.ticketNumber;
      state.newOrderInfo.started = false;

      state.newOrderAmounts = initialState.newOrderAmounts;
      state.newOrderDetail = initialState.newOrderDetail;
    },
    addProductToNewOrder: (state, action: PayloadAction<INewOrderDetail>) => {
      state.newOrderDetail.push(action.payload);
      state.newOrderAmounts = calculateTotalOrderAmounts(state.newOrderDetail);
    },
    removeProductFromNewOrder: (state, action: PayloadAction<number>) => {
      const newArray = state.newOrderDetail.filter(
        (item) => item.productId !== action.payload
      );
      state.newOrderDetail = newArray;
      state.newOrderAmounts = calculateTotalOrderAmounts(newArray);
    },
    incremenetProductQuantityFromNewOrder: (
      state,
      action: PayloadAction<INewOrderDetail>
    ) => {
      let itemIndex = state.newOrderDetail.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (itemIndex !== -1)
        state.newOrderDetail[itemIndex] = incremenetProductQuantity(
          action.payload
        );

      state.newOrderAmounts = calculateTotalOrderAmounts(state.newOrderDetail);
    },
    decrementProductQuantityFromNewOrder: (
      state,
      action: PayloadAction<INewOrderDetail>
    ) => {
      let item = state.newOrderDetail.find(
        (prod) => prod.productId === action.payload.productId
      );
      if (item?.quantity === 1) {
        removeProductFromNewOrder(item.productId);
      } else {
        let itemIndex = state.newOrderDetail.findIndex(
          (item) => item.productId === action.payload.productId
        );
        if (itemIndex !== -1)
          state.newOrderDetail[itemIndex] = decrementProductQuantity(
            action.payload
          );
      }

      state.newOrderAmounts = calculateTotalOrderAmounts(state.newOrderDetail);
    },
  },
});

export const selectNewOrder = (state: RootState) => state.newOrder;

export const {
  setNewOrderType,
  cancelNewOrder,
  addProductToNewOrder,
  removeProductFromNewOrder,
  incremenetProductQuantityFromNewOrder,
  decrementProductQuantityFromNewOrder,
} = newOrderSlice.actions;

export default newOrderSlice.reducer;
