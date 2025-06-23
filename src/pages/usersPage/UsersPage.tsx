import { FaUserFriends } from 'react-icons/fa';

export const UsersPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaUserFriends size={128} className="mb-3 text-secondary" />
        <h2>Страница пользователей</h2>
        <p>Здесь отображается список пользователей</p>
      </div>
    </div>
  );
};
