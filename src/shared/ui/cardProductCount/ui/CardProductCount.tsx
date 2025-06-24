import { FaListUl } from 'react-icons/fa';
import './CardProductCount.css';

interface IProrps {
  productCount: number;
  onProductCounClick: () => void;
}

export const CardProductCount = ({ productCount, onProductCounClick }: IProrps) => {
  return (
    <div className="card__info">
      <div className="icon-circle">
        <FaListUl onClick={onProductCounClick} />
      </div>
      <div className="product-count">
        <div className="count">{productCount}</div>
        <div className="label">Продукта</div>
      </div>
    </div>
  );
};
