import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/features';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProducts, deleteProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
