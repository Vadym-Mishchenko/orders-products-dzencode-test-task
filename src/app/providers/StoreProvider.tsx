import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { fetchOrders } from '@/features/order/api/ordersThunks';
import { fetchProducts } from '@/features/product/api/productsThunks';

interface Props {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([store.dispatch(fetchOrders()), store.dispatch(fetchProducts())]);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    loadData();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
