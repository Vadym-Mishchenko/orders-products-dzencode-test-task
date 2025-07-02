import { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout, PageTransition } from '@/shared';
import { appRoutes } from './config';

export const AppRouter = () => {
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      }
    >
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
    </Suspense>
  );
};
