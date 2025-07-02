import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchProductsThunk,
  createProductThunk,
  deleteProductThunk,
  type Product,
  updateProductOrderThunk,
} from '@/features';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // загрузка продуктов
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Failed to fetch products');
      })
      // создание продукта
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Failed to create product');
      })
      // удаление продукта
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Failed to delete product');
      })
      // обновление поля order у продукта
      .addCase(updateProductOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductOrderThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.loading = false;
      })
      .addCase(updateProductOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Failed to update product order');
      });
  },
});

export const productReducer = productSlice.reducer;
export default productReducer;
