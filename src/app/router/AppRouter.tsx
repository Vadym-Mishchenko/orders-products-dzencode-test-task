import { Routes, Route } from 'react-router-dom';
import { OrdersPage, ProductsPage } from '@/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
};
