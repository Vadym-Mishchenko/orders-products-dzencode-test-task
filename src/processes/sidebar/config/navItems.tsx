import { FaBoxOpen, FaLayerGroup, FaUserFriends, FaCog, FaCubes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const useNavItems = () => {
  const { t } = useTranslation();

  return [
    { to: '/orders', icon: <FaBoxOpen className="me-2" />, label: t('Orders') },
    { to: '/groups', icon: <FaLayerGroup className="me-2" />, label: t('Groups') },
    { to: '/products', icon: <FaCubes className="me-2" />, label: t('Products') },
    { to: '/users', icon: <FaUserFriends className="me-2" />, label: t('Users') },
    { to: '/settings', icon: <FaCog className="me-2" />, label: t('Setings') },
  ];
};
