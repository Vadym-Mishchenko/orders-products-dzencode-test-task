import './CardIndicator.css';

interface Iprops {
  color?: 'green' | 'gray';
  width: string;
}

export const CardIndicator = ({ color = 'gray', width }: Iprops) => {
  return (
    <div className={`card-indicator card-indicator--${color}`} style={{ width, height: width }} />
  );
};
