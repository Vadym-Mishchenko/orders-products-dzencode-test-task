import { FaLayerGroup } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const GroupsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaLayerGroup size={128} className="mb-3 text-secondary" />
        <h2>{t('Groups Page')}</h2>
        <p>{t('Groups management is displayed here')}</p>
      </div>
    </div>
  );
};
