import { formatDate } from '@/shared';
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
  return (
    <div className="card-term" style={{ width }}>
      <div>
        <span className="card-term__label">с</span>
        <span>{formatDate(guarantee.start, 'numeric')}</span>
      </div>
      <div>
        <span className="card-term__label 'numeric'">по</span>
        <span>{formatDate(guarantee.end)}</span>
      </div>
    </div>
  );
};
