import * as React from 'react';
import { Outlet } from 'react-router-dom';

export type MainLayoutProps = {
  header: React.ReactNode | null;
  footer: React.ReactNode | null;
};

export const MainLayout = ({ header, footer }: MainLayoutProps) => {
  return (
    <>
      {header}
      <main>
        <Outlet />
      </main>
      {footer}
    </>
  );
};

export default MainLayout;
