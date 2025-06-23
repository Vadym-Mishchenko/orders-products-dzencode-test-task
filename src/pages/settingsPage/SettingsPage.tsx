import { FaCog } from 'react-icons/fa';

export const SettingsPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaCog size={128} className="mb-3 text-secondary" />
        <h2>Страница настроек</h2>
        <p>Здесь вы можете изменить настройки приложения</p>
      </div>
    </div>
  );
};
