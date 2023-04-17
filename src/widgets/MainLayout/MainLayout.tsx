import { Container } from '@chakra-ui/react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export type MainLayoutProps = {
  header?: React.ReactNode | null;
  footer?: React.ReactNode | null;
};

export const MainLayout = ({ header, footer }: MainLayoutProps) => {
  return (
    <>
      {header ?? null}
      <Container as={'main'} maxW="container.lg">
        <Outlet />
      </Container>
      {footer ?? null}
    </>
  );
};

export default MainLayout;
