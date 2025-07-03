import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { StoreProvider } from './app/providers/StoreProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shared/config/i18n/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
