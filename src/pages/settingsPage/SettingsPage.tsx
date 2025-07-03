import { FaCog } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaCog size={128} className="mb-3 text-secondary" />
        <h2>{t('Settings Page')}</h2>
        <p>{t('Here you can change app settings')}</p>
      </div>
    </div>
  );
};
