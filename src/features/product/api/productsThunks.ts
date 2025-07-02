import { fetchProducts as fetchProductsApi } from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
  try {
    return await fetchProductsApi();
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch products');
  }
});
