import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../models/Product';

const initialState: { list: { [key: string]: Product } } = { list: {} };

export const productsListSlice = createSlice({
  name: 'productsList',
  initialState,
  reducers: {
    pl_addProducts: (
      state,
      action: PayloadAction<{ [key: string]: Product }>
    ) => {
      state.list = { ...state.list, ...action.payload };
    },
    pl_removeProduct: (state, action: PayloadAction<string>) => {
      delete state.list[action.payload];
    }
  }
});

export const { pl_addProducts, pl_removeProduct } = productsListSlice.actions;

export default productsListSlice.reducer;
