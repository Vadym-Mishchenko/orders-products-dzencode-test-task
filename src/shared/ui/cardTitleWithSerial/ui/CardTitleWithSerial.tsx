import './CardTitleWithSerial.css';

interface Iprops {
  title: string;
  serialNumber: number | string;
  width: string;
}

export const CardTitleWithSerial = ({ title, serialNumber, width }: Iprops) => {
  return (
    <div className="card-title-serial" style={{ width, minWidth: '80px' }}>
      <div className="card-title-serial__title">{title}</div>
      <div className="card-title-serial__serial">SN-{serialNumber}</div>
    </div>
  );
};
