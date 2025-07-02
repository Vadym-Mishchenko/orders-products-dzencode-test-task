import { lazy } from 'react';

const OrdersPage = lazy(() =>
  import('@/pages/ordersPage').then((module) => ({ default: module.OrdersPage })),
);
const ProductsPage = lazy(() =>
  import('@/pages/productsPage').then((module) => ({ default: module.ProductsPage })),
);
const SettingsPage = lazy(() =>
  import('@/pages/settingsPage').then((module) => ({ default: module.SettingsPage })),
);
const UsersPage = lazy(() =>
  import('@/pages/usersPage').then((module) => ({ default: module.UsersPage })),
);
const GroupsPage = lazy(() =>
  import('@/pages/groupsPage').then((module) => ({ default: module.GroupsPage })),
);
const UserPage = lazy(() =>
  import('@/pages/userPage').then((module) => ({ default: module.UserPage })),
);

export const appRoutes = [
  { path: '/orders', element: <OrdersPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/groups', element: <GroupsPage /> },
  { path: '/user', element: <UserPage /> },
];
