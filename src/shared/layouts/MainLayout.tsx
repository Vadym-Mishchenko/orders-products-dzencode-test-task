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
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        <TopMenu />
      </div>

      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1">{children}</main>
      </div>
    </div>
  );
};
