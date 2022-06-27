import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../models/ICategory';
import { RootState } from './store';

export type State = {
  categories: ICategory[];
};

const initialState: State = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const selectCategories = (state: RootState) => state.category;

export const selectCategoryByName =
  (categoryName: string) => (state: RootState) =>
    state.category.categories.find(
      (category) => category.name === categoryName
    );

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
