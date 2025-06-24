import { OrderCard } from '@/processes';

export const OrdersPage = () => {
  return (
    <div className="d-flex flex-column gap-2 p-5 h-100">
      {[1, 2, 3, 4].map((_, index) => (
        <OrderCard key={index} />
      ))}
    </div>
  );
};
