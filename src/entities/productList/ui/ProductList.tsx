import { type Product } from '@/features';
import { CardAvatar, CardDelete, CardIndicator, CardStatus, CardTitleWithSerial } from '@/shared';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import './ProductList.css';

interface IProps {
  products: Product[];
  orderId: number;
  orderTitle: string;
  onClose: () => void;
  onRemoveProduct: (orderId: number, product: Product) => void;
}

export const ProductList = ({
  products,
  orderId,
  orderTitle,
  onClose,
  onRemoveProduct,
}: IProps) => {
  return (
    <div className="product-list-wrapper">
      <button
        className="product-list__close"
        onClick={onClose}
        aria-label="Закрыть окно"
        type="button"
      ></button>

      <div className="product-list border rounded shadow-sm bg-white position-relative p-3">
        <h5 className="product-list__title fw-bold mb-3">{orderTitle}</h5>
        <button className="product-list__add-btn d-flex align-items-center gap-2 mb-4 border-0 bg-transparent">
          <div className="product-list__add-icon d-flex justify-content-center align-items-center">
            <FaPlus className="product-list__add-icon-svg" />
          </div>
          <span className="product-list__add-text">Добавить продукт</span>
        </button>

        {products.length === 0 ? (
          <p className="product-list__empty text-muted">Нет продуктов в этом заказе</p>
        ) : (
          <ul className="product-list__items d-flex flex-column gap-2">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: index * 0.1,
                }}
                layout
                className="product-list__item"
              >
                <div className="product-list__item-content">
                  <CardIndicator color={product.isNew ? 'green' : 'gray'} width="12px" />
                  <CardAvatar src={`/images/${product.photo}`} width="88px" />
                  <CardTitleWithSerial
                    title={product.title}
                    serialNumber={product.serialNumber}
                    width="200px"
                  />
                  <CardStatus isNew={product.isNew} width="50px" />
                  <CardDelete onDelete={() => onRemoveProduct(orderId, product)} width="20px" />
                </div>
              </motion.div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
