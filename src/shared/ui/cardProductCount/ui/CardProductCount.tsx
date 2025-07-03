import { FaListUl } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './CardProductCount.css';

interface IProps {
  productCount: number;
  onProductCounClick: () => void;
  width: string;
}

export const CardProductCount = ({ productCount, onProductCounClick, width }: IProps) => {
  const { t } = useTranslation();

  const getLabel = (n: number) => {
    const mod10 = n % 10;
    const mod100 = n % 100;

    if (mod10 === 1 && mod100 !== 11) return t('product_one');
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return t('product_few');
    return t('product_many');
  };

  return (
    <div className="card__info" style={{ width }}>
      <div className="icon-circle" onClick={onProductCounClick}>
        <FaListUl />
      </div>
      <div className="product-count">
        <div className="count">{productCount}</div>
        <div className="label">{getLabel(productCount)}</div>
      </div>
    </div>
  );
};
