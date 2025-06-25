import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { setOrders, setProducts } from '@/entities';
import { orders, products } from '@/shared';

interface Props {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  useEffect(() => {
    store.dispatch(setOrders(orders));
    store.dispatch(setProducts(products));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
