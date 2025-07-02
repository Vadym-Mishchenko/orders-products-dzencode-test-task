import { fetchProducts, createProduct, deleteProduct, updateProduct } from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../model';
import { RootState } from '@/app';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      return await fetchProducts();
    } catch {
      return thunkAPI.rejectWithValue('Failed to fetch products');
    }
  },
);

export const createProductThunk = createAsyncThunk<Product, Omit<Product, 'id'>>(
  'products/createProduct',
  async (newProduct, thunkAPI) => {
    try {
      const created = await createProduct(newProduct);
      return created;
    } catch {
      return thunkAPI.rejectWithValue('Failed to create product');
    }
  },
);

export const deleteProductThunk = createAsyncThunk<number, number>(
  'products/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      await deleteProduct(productId);
      return productId;
    } catch {
      return thunkAPI.rejectWithValue('Failed to delete product');
    }
  },
);

export const updateProductOrderThunk = createAsyncThunk<
  Product,
  { productId: number; orderId: number | null },
  { state: RootState; rejectValue: string }
>('products/updateProductOrder', async ({ productId, orderId }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const product = state.product.products.find((p) => p.id === productId);
    if (!product) throw new Error('Product not found');

    const updatedProduct = await updateProduct(productId, { ...product, order: orderId });
    return updatedProduct;
  } catch {
    return thunkAPI.rejectWithValue('Failed to update product order');
  }
});
