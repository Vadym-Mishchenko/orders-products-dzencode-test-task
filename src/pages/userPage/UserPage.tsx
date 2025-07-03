import { FaUserCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const UserPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaUserCircle size={128} className="mb-3 text-secondary" />
        <h2>{t('User Profile')}</h2>
        <p>{t('User information is displayed here')}</p>
      </div>
    </div>
  );
};
