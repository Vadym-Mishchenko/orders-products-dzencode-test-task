import { CardAmount, CardDate, CardDelete, CardProductCount, CardTitle } from '@/shared';
import './OrderCard.css';
import type { Order } from '@/entities';

interface IProps {
  order: Order;
}

export const OrderCard = ({ order }: IProps) => {
  console.log('OrderCard', order);
  return (
    <div className="order-card">
      <CardTitle title={order.title} />
      <div className="order-card__meta">
        <CardProductCount
          productCount={order.products.length}
          onProductCounClick={() => console.log('Modal')}
        />
        <CardDate date={new Date(order.date)} />
        <CardAmount products={order.products} />
        <CardDelete onDelete={() => console.log('delete')} />
      </div>
    </div>
  );
};
