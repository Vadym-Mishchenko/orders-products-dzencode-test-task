interface IProps {
  isNew: 0 | 1;
  width: string;
}

export const CardType = ({ isNew, width }: IProps) => {
  const typeText = isNew === 1 ? 'новый' : 'Б / У';

  return <div style={{ width, minWidth: '48px' }}>{typeText}</div>;
};
