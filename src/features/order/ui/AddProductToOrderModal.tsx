import { useState } from 'react';
import { ModalForm } from '@/shared';
import type { Product } from '@/features';
import { useTranslation } from 'react-i18next';

interface IProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (productIds: number[]) => void;
  products: Product[];
  excludedProductIds?: number[];
}

export const AddProductToOrderModal = ({
  isOpen,
  onCancel,
  onConfirm,
  products,
  excludedProductIds = [],
}: IProps) => {
  const { t } = useTranslation();
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const handleConfirm = () => {
    if (selectedProductIds.length > 0) {
      onConfirm(selectedProductIds);
      setSelectedProductIds([]);
    }
  };

  const availableProducts = products.filter((p) => !excludedProductIds.includes(p.id));

  return (
    <ModalForm
      isOpen={isOpen}
      onCancel={() => {
        setSelectedProductIds([]);
        onCancel();
      }}
      onConfirm={handleConfirm}
      title={t('Add product to order')}
    >
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {availableProducts.length === 0 && (
          <p className="text-muted">{t('No available products to add')}</p>
        )}
        {availableProducts.map((product) => (
          <div key={product.id} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`product-${product.id}`}
              checked={selectedProductIds.includes(product.id)}
              onChange={() => handleToggle(product.id)}
            />
            <label htmlFor={`product-${product.id}`} className="form-check-label">
              {product.title} (SN: {product.serialNumber})
            </label>
          </div>
        ))}
      </div>
    </ModalForm>
  );
};
