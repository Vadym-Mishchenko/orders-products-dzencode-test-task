import { FaCubes } from 'react-icons/fa';

export const ProductsPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaCubes size={128} className="mb-3 text-secondary" />
        <h2>Страница продуктов</h2>
        <p>Здесь отображается список всех продуктов</p>
      </div>
    </div>
  );
};
