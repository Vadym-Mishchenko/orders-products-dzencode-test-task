import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard, type Product, AddNewProductModal } from '@/features';
import { openDeleteModal, closeDeleteModal, ModalDelete } from '@/entities';
import { useAppSelector, useAppDispatch } from '@/shared';
import { FaPlus } from 'react-icons/fa';
import './ProductsPage.css';
import { createProductThunk, deleteProductThunk } from '@/features';
import { useTranslation } from 'react-i18next';

export const ProductsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { isOpen, itemId } = useAppSelector((state) => state.deleteModal);

  const productTypes = Array.from(new Set(products.map((p) => p.type)));

  const handleOpenDeleteModal = (product: Product) => {
    dispatch(openDeleteModal({ itemType: 'product', itemId: product.id }));
  };

  const handleConfirmDelete = async () => {
    if (itemId) {
      try {
        await dispatch(deleteProductThunk(itemId)).unwrap();
        dispatch(closeDeleteModal());
      } catch (error) {
        console.error(t('Error deleting product'), error);
      }
    }
  };

  const handleCancelDelete = () => {
    dispatch(closeDeleteModal());
  };

  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts =
    selectedType === 'all' ? products : products.filter((p) => p.type === selectedType);

  const productToDelete = products.find((p) => p.id === itemId);

  const handleAddNewProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      await dispatch(createProductThunk(productData)).unwrap();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(t('Error creating product'), error);
    }
  };

  useEffect(() => {
    const currentTypes = new Set(products.map((p) => p.type));
    if (selectedType !== 'all' && !currentTypes.has(selectedType)) {
      setSelectedType('all');
    }
  }, [products, selectedType]);

  return (
    <div className="products-page">
      <div className="d-flex align-items-center gap-3 mb-3">
        <button
          className="p-3 d-flex align-items-center gap-2 border-0 bg-transparent"
          type="button"
          onClick={() => setIsAddModalOpen(true)}
        >
          <div className="product-list__add-icon d-flex justify-content-center align-items-center">
            <FaPlus className="product-list__add-icon-svg" />
          </div>
          <span className="product-list__add-text">{t('Create product')}</span>
        </button>

        <select
          className="form-select w-25"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">{t('All types')}</option>
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
        message={productToDelete ? t('Are you sure you want to delete this product?') : undefined}
        product={productToDelete}
      />

      <AddNewProductModal
        isOpen={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onConfirm={handleAddNewProduct}
      />
    </div>
  );
};
