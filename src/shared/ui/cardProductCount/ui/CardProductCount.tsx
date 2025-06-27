import { FaListUl } from 'react-icons/fa';
import './CardProductCount.css';

interface IProrps {
  productCount: number;
  onProductCounClick: () => void;
  width: string;
}

export const CardProductCount = ({ productCount, onProductCounClick, width }: IProrps) => {
  const declOfNum = (n: number, titles: [string, string, string]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]];
  };

  const label = declOfNum(productCount, ['Продукт', 'Продукта', 'Продуктов']);
  return (
    <div className="card__info" style={{ width }}>
      <div className="icon-circle" onClick={onProductCounClick}>
        <FaListUl />
      </div>
      <div className="product-count">
        <div className="count">{productCount}</div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
};
