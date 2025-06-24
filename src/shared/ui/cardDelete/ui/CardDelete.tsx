import { FaTrashAlt } from 'react-icons/fa';
import './CardDelete.css';

interface IProrps {
  onDelete: () => void;
}

export const CardDelete = ({ onDelete }: IProrps) => {
  return (
    <button className="order-card__delete" onClick={onDelete}>
      <FaTrashAlt />
    </button>
  );
};
