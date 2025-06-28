import './CardTitle.css';

interface IProps {
  title: string;
  width: string;
  bold?: boolean;
}

export const CardTitle = ({ title, width, bold }: IProps) => {
  return (
    <div className={`order-card__title${bold ? ' order-card__title_bold' : ''}`} style={{ width }}>
      {title}
    </div>
  );
};
