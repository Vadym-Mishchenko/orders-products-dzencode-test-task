import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, type Product } from '@/features';

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
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    assignProductsToOrder(state, action: PayloadAction<{ orderId: number; productIds: number[] }>) {
      const { orderId, productIds } = action.payload;
      state.products.forEach((product) => {
        if (productIds.includes(product.id)) {
          product.order = orderId;
        }
      });
    },
    removeProductFromOrder(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.order = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Failed to fetch products');
      });
  },
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  assignProductsToOrder,
  removeProductFromOrder,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
export default productReducer;
