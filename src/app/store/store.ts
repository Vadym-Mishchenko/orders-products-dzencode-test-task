import { configureStore } from '@reduxjs/toolkit';
import { deleteModalReducer, orderReducer, sessionReducer } from '@/entities';
import { productReducer } from '@/features';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    deleteModal: deleteModalReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
