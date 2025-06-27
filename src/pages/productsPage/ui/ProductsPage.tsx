import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard, type Product, deleteProduct } from '@/features';
import { openDeleteModal, closeDeleteModal, ModalDelete } from '@/entities';
import { useAppSelector, useAppDispatch } from '@/shared';
import './ProductsPage.css';

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { isOpen, itemId } = useAppSelector((state) => state.deleteModal);

  const productTypes = Array.from(new Set(products.map((p) => p.type)));

  const handleOpenDeleteModal = (product: Product) => {
    dispatch(openDeleteModal({ itemType: 'product', itemId: product.id }));
  };

  const handleConfirmDelete = () => {
    if (itemId) {
      dispatch(deleteProduct(itemId));
      dispatch(closeDeleteModal());
    }
  };

  const handleCancelDelete = () => {
    dispatch(closeDeleteModal());
  };

  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredProducts =
    selectedType === 'all' ? products : products.filter((p) => p.type === selectedType);

  const productToDelete = products.find((p) => p.id === itemId);

  useEffect(() => {
    const currentTypes = new Set(products.map((p) => p.type));
    if (selectedType !== 'all' && !currentTypes.has(selectedType)) {
      setSelectedType('all');
    }
  }, [products, selectedType]);

  return (
    <div className="products-page">
      <div className="px-3">
        <select
          className="form-select w-25"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">Все типы</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="products-scroll-wrapper">
        <div className="products-scroll-container d-flex flex-column gap-3">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
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
              >
                <ProductCard product={product} onDelete={() => handleOpenDeleteModal(product)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ModalDelete
        isOpen={isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={productToDelete ? `Вы уверены что хотите удалить этот продукт?` : undefined}
        product={productToDelete}
      />
    </div>
  );
};
