import type { Product } from '@/features';
import {
  CardAmount,
  CardAvatar,
  CardDate,
  CardDelete,
  CardIndicator,
  CardStatus,
  CardTerm,
  CardTitle,
  CardTitleWithSerial,
  CardType,
  useAppSelector,
} from '@/shared';
import './ProductCard.css';

interface Props {
  product: Product;
  onDelete: (id: number) => void;
}

export const ProductCard = ({ product, onDelete }: Props) => {
  const { orders } = useAppSelector((state) => state.order);
  const order = orders.find((o) => o.id === product.order);

  return (
    <div className="product-card">
      <CardIndicator color={product.isNew ? 'green' : 'gray'} width="12px" />
      <CardAvatar src={`/images/${product.photo}`} width="88px" />
      <CardTitleWithSerial title={product.title} serialNumber={product.serialNumber} width="20%" />
      <CardStatus isNew={product.isNew} width="10%" />
      <CardTerm guarantee={product.guarantee} width="14%" />
      <CardType isNew={product.isNew} width="5%" />
      <CardAmount products={[product]} width="10%" />
      <CardTitle title={product.type} width="10%" />
      <CardTitle title={order ? order.title : '—'} width="20%" />
      <CardDate date={new Date(product.date)} width="14%" />
      <CardDelete onDelete={() => onDelete(product.id)} width="5%" />
    </div>
  );
};
