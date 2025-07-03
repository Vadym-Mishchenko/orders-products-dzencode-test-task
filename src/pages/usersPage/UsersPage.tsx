import { FaUserFriends } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const UsersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaUserFriends size={128} className="mb-3 text-secondary" />
        <h2>{t('Users Page')}</h2>
        <p>{t('Users list is displayed here')}</p>
      </div>
    </div>
  );
};
