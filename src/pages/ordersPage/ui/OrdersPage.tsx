import { FaBoxOpen } from 'react-icons/fa';

export const OrdersPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaBoxOpen size={128} className="mb-3 text-secondary" />
        <h2>Страница приходов</h2>
        <p>Здесь отображаются данные о приходах</p>
      </div>
    </div>
  );
};
