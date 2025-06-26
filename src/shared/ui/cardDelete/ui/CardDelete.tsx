import { FaTrashAlt } from 'react-icons/fa';
import './CardDelete.css';

interface IProrps {
  onDelete: () => void;
  width: string;
}

export const CardDelete = ({ onDelete, width }: IProrps) => {
  return (
    <button className="order-card__delete" onClick={onDelete} style={{ width }}>
      <FaTrashAlt />
    </button>
  );
};
