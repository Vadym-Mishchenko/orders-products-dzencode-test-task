import { FaUserCircle } from 'react-icons/fa';

export const UserPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaUserCircle size={128} className="mb-3 text-secondary" />
        <h2>Профиль пользователя</h2>
        <p>Здесь отображается информация о пользователе</p>
      </div>
    </div>
  );
};
