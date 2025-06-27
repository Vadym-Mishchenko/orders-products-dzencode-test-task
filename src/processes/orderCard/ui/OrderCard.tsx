import { CardAmount, CardDate, CardDelete, CardProductCount, CardTitle } from '@/shared';
import './OrderCard.css';
import type { Order } from '@/entities';

interface IProps {
  order: Order;
  onDelete: () => void;
}

export const OrderCard = ({ order, onDelete }: IProps) => {
  return (
    <div className="order-card">
      <CardTitle title={order.title} width="50%" />
      <div className="order-card__meta">
        <CardProductCount
          productCount={order.products.length}
          onProductCounClick={() => console.log('Modal')}
          width="20%"
        />
        <CardDate date={new Date(order.date)} width="20%" />
        <CardAmount products={order.products} width="25%" />
        <CardDelete onDelete={onDelete} width="5%" />
      </div>
    </div>
  );
};
