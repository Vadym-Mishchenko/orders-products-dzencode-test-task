import { FaLayerGroup } from 'react-icons/fa';

export const GroupsPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-center">
        <FaLayerGroup size={128} className="mb-3 text-secondary" />
        <h2>Страница групп</h2>
        <p>Здесь отображается управление группами</p>
      </div>
    </div>
  );
};
