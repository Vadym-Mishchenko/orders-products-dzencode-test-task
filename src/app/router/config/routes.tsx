import { OrdersPage, ProductsPage, SettingsPage, UsersPage, GroupsPage, UserPage } from '@/pages';

export const appRoutes = [
  { path: '/orders', element: <OrdersPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/groups', element: <GroupsPage /> },
  { path: '/user', element: <UserPage /> },
];
