import { formatDate } from '@/shared';
import { useTranslation } from 'react-i18next';
import './CardTerm.css';

interface Guarantee {
  start: string;
  end: string;
}

interface IProps {
  guarantee: Guarantee;
  width: string;
}

export const CardTerm = ({ guarantee, width }: IProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="card-term" style={{ width }}>
      <div>
        <span className="card-term__label">{t('fr')}</span>
        <span>{formatDate(guarantee.start, 'numeric', i18n.language)}</span>
      </div>
      <div>
        <span className="card-term__label">{t('to')}</span>
        <span>{formatDate(guarantee.end, 'numeric', i18n.language)}</span>
      </div>
    </div>
  );
};
