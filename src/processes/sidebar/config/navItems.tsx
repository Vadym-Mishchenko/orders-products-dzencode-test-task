import { FaBoxOpen, FaLayerGroup, FaUserFriends, FaCog, FaCubes } from 'react-icons/fa';

export const navItems = [
  { to: '/orders', icon: <FaBoxOpen className="me-2" />, label: 'Приход' },
  { to: '/groups', icon: <FaLayerGroup className="me-2" />, label: 'Группы' },
  { to: '/products', icon: <FaCubes className="me-2" />, label: 'Продукты' },
  { to: '/users', icon: <FaUserFriends className="me-2" />, label: 'Пользователи' },
  { to: '/settings', icon: <FaCog className="me-2" />, label: 'Настройки' },
];
