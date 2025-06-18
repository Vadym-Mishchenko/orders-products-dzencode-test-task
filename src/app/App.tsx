import { RouterProvider } from './providers';
import { TopMenu } from '@/processes';
import { AppRouter } from './router/AppRouter';
import './App.css';

export const App = () => {
  return (
    <RouterProvider>
      <TopMenu />
      <AppRouter />
    </RouterProvider>
  );
};
