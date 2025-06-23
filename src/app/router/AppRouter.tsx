import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/shared';
import { appRoutes } from './config';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Navigate to="/orders" replace />
          </MainLayout>
        }
      />

      {appRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<MainLayout>{element}</MainLayout>} />
      ))}
    </Routes>
  );
};
