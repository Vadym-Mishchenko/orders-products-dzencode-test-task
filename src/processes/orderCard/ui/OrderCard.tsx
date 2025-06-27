import { CardAmount, CardDate, CardDelete, CardProductCount, CardTitle } from '@/shared';
import type { Order } from '@/entities';
import { FaChevronRight } from 'react-icons/fa';
import './OrderCard.css';

interface IProps {
  order: Order;
  onDelete: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showExpandIcon: boolean;
}

export const OrderCard = ({
  order,
  onDelete,
  isCollapsed,
  onToggleCollapse,
  showExpandIcon,
}: IProps) => {
  return (
    <div className={`order-card ${isCollapsed ? 'collapsed' : ''}`}>
      {!isCollapsed && <CardTitle title={order.title} width="50%" />}

      <div className="order-card__meta">
        <CardProductCount
          productCount={order.products.length}
          onProductCounClick={onToggleCollapse}
          width="20%"
        />
        <CardDate date={new Date(order.date)} width="20%" />
        {!isCollapsed && (
          <>
            <CardAmount products={order.products} width="25%" />
            <CardDelete onDelete={onDelete} width="5%" />
          </>
        )}
        {showExpandIcon && (
          <div className="expand-icon">
            <FaChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};
