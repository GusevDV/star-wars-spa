import { Container } from '@chakra-ui/react';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export type MainLayoutProps = {
  header?: React.ReactNode | null;
  footer?: React.ReactNode | null;
};

const MainLayout = ({ header, footer, children }: PropsWithChildren<MainLayoutProps>) => {
  return (
    <>
      {header ?? null}
      <Container as={'main'} maxW="container.xl" py={10} data-testid="main-container">
        {children ? children : <Outlet />}
      </Container>
      {footer ?? null}
    </>
  );
};

export default MainLayout;
