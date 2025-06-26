import { ProductCard, type Product } from '@/features';
import { useAppSelector } from '@/shared';
import './ProductsPage.css';

export const ProductsPage = () => {
  const { products } = useAppSelector((state) => state.product);

  const handleDelete = (product: Product) => {
    console.log('Удалить продукт:', product.title);
  };

  return (
    <div className="products-page">
      <div className="products-scroll-wrapper">
        <div className="products-scroll-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
