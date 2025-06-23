import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout, PageTransition } from '@/shared';
import { appRoutes } from './config';

export const AppRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <MainLayout>
            <Navigate to="/orders" replace />
          </MainLayout>
        }
      />

      {appRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <MainLayout>
              <PageTransition>{element}</PageTransition>
            </MainLayout>
          }
        />
      ))}
    </Routes>
  );
};
