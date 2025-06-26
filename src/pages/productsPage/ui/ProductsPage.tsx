import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard, type Product } from '@/features';
import { useAppSelector } from '@/shared';
import { containerVariants, cardVariants } from './animations';
import './ProductsPage.css';

export const ProductsPage = () => {
  const { products } = useAppSelector((state) => state.product);
  const [selectedType, setSelectedType] = useState<string>('all');
  const productTypes = Array.from(new Set(products.map((p) => p.type)));

  const handleDelete = (product: Product) => {
    console.log('Удалить продукт:', product.title);
  };

  const filteredProducts =
    selectedType === 'all' ? products : products.filter((product) => product.type === selectedType);

  return (
    <div className="products-page ">
      <div className="px-3 ">
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
        <motion.div
          className="products-scroll-container d-flex flex-column gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedType}
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} onDelete={() => handleDelete(product)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
