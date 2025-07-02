import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { fetchProductsThunk } from '@/features/product/api/productsThunks';
import { fetchOrdersThunk } from '@/features';

interface Props {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          store.dispatch(fetchOrdersThunk()),
          store.dispatch(fetchProductsThunk()),
        ]);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    loadData();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
