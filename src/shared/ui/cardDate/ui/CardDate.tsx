import { formatDate } from '@/shared';
import './CardDate.css';

interface IProps {
  date: Date;
  width: string;
}

export const CardDate = ({ date, width }: IProps) => {
  return (
    <div className="card__date" style={{ width }}>
      {formatDate(date, 'shortText')}
    </div>
  );
};
