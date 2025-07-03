import { useTranslation } from 'react-i18next';

interface IProps {
  isNew: boolean;
  width: string;
}

export const CardType = ({ isNew, width }: IProps) => {
  const { t } = useTranslation();

  const typeText = isNew ? t('new') : t('used');

  return <div style={{ width, minWidth: '48px' }}>{typeText}</div>;
};
