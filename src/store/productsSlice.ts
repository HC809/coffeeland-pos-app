import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { IProduct } from '../models/IProduct';

export type State = {
  products: IProduct[];
};

const initialState: State = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const selectProduct = (state: RootState) => state.product;

export const selectProductByCategoryId =
  (categoryId: number) => (state: RootState) =>
    state.product.products.filter(
      (product) => product.categoryId === categoryId
    );

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
