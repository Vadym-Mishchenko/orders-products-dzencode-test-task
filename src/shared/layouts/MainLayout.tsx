import type { ReactNode } from 'react';
import { TopMenu, Sidebar } from '@/processes';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        style={{
          zIndex: 1000,
          position: 'sticky',
          top: 0,
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        <TopMenu />
      </div>

      <div className="d-flex flex-grow-1 w-100 overflow-hidden">
        <Sidebar />
        <main className="flex-grow-1" style={{ width: 'calc(100vw - 220px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
