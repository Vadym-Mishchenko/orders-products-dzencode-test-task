interface IProps {
  isNew: boolean;
  width: string;
}

export const CardType = ({ isNew, width }: IProps) => {
  const typeText = isNew ? 'новый' : 'Б / У';

  return <div style={{ width, minWidth: '48px' }}>{typeText}</div>;
};
