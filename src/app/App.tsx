import { RouterProvider } from './providers';
import { AppRouter } from './router/AppRouter';

export const App = () => {
  return (
    <RouterProvider>
      <AppRouter />
    </RouterProvider>
  );
};
