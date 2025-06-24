import './CardDate.css';

interface Props {
  date: Date;
}

export const CardDate = ({ date }: Props) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '');
  const year = date.getFullYear();

  return (
    <div className="card__date">
      {`${day} / ${month.charAt(0).toUpperCase() + month.slice(1)} / ${year}`}
    </div>
  );
};
