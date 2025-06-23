import { RouterProvider } from './providers';
import { AppRouter } from './router/AppRouter';
import './App.css';

export const App = () => {
  return (
    <RouterProvider>
      <AppRouter />
    </RouterProvider>
  );
};
