import './CardTitle.css';

interface IProps {
  title: string;
  width: string;
}

export const CardTitle = ({ title, width }: IProps) => {
  return (
    <div className="order-card__title" style={{ width }}>
      {title}
    </div>
  );
};
