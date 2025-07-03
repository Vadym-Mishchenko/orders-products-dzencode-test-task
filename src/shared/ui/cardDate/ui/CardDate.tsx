import { formatDate } from '@/shared';
import { useTranslation } from 'react-i18next';
import './CardDate.css';

interface IProps {
  date: Date;
  width: string;
}

export const CardDate = ({ date, width }: IProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="card__date" style={{ width }}>
      {formatDate(date, 'shortText', i18n.language)}
    </div>
  );
};
