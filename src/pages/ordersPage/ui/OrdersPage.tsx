import { OrderCard } from '@/processes';
import { useAppSelector } from '@/shared';

export const OrdersPage = () => {
  const { orders } = useAppSelector((state) => state.order);

  return (
    <div className="d-flex flex-column gap-2 p-5 h-100">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
