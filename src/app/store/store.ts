import { configureStore } from '@reduxjs/toolkit';
import { deleteModalReducer, orderReducer } from '@/entities';
import { productReducer } from '@/features';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    deleteModal: deleteModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
