interface Iprops {
  isNew: number;
  width: string;
}

export const CardStatus = ({ isNew, width }: Iprops) => {
  const status = isNew === 1 ? 'свободен' : 'в ремонте';
  const color = isNew === 1 ? '#8dc63f' : '#444';

  return (
    <div className="card-status fw-semibold" style={{ color, width, minWidth: '80px' }}>
      {status}
    </div>
  );
};
