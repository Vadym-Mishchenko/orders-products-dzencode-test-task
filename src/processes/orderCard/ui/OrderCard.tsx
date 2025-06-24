import { CardAmount, CardDate, CardDelete, CardProductCount, CardTitle } from '@/shared';
import './OrderCard.css';

export const OrderCard = () => {
  return (
    <div className="order-card">
      <CardTitle title="Длинное предлинное длинючее название прихода" />
      <div className="order-card__meta">
        <CardProductCount productCount={23} onProductCounClick={() => console.log('Modal')} />
        <CardDate date={new Date('2025-04-6 12:09:33')} />
        <CardAmount
          price={[
            { value: 100.12, symbol: 'USD', isDefault: 0 },
            { value: 2600.13, symbol: 'UAH', isDefault: 1 },
          ]}
        />
        <CardDelete onDelete={() => console.log('delete')} />
      </div>
    </div>
  );
};
