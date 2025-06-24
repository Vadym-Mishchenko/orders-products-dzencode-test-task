import './CardTitle.css';

interface IProps {
  title: string;
}

export const CardTitle = ({ title }: IProps) => {
  return <div className="order-card__title">{title}</div>;
};
