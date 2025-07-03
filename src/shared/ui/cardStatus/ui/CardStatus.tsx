import { useTranslation } from 'react-i18next';

interface Iprops {
  isNew: boolean;
  width: string;
}

export const CardStatus = ({ isNew, width }: Iprops) => {
  const { t } = useTranslation();

  const status = isNew ? t('available') : t('in repair');
  const color = isNew ? '#8dc63f' : '#444';

  return (
    <div className="card-status fw-semibold" style={{ color, width, minWidth: '80px' }}>
      {status}
    </div>
  );
};
