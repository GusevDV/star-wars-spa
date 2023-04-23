import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout, { MainLayoutProps } from '../MainLayout';

describe('MainLayout', () => {
  const defaultProps: MainLayoutProps = {
    header: <div>Header content</div>,
    footer: <div>Footer content</div>,
  };

  it('displays the header, children, and footer', () => {
    const childrenContent = <div>Children content</div>;
    render(<MainLayout {...defaultProps}>{childrenContent}</MainLayout>);

    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();

    const children = screen.getByText('Children content');
    expect(children).toBeInTheDocument();

    const footer = screen.getByText('Footer content');
    expect(footer).toBeInTheDocument();
  });

  it('does not display header and footer when they are null', () => {
    render(<MainLayout />);

    expect(screen.queryByText('Header content')).not.toBeInTheDocument();
    expect(screen.queryByText('Footer content')).not.toBeInTheDocument();
  });

  it('renders Outlet when children are not provided', () => {
    const TestComponent = () => {
      return <div data-testid="test-route-content">Test Route Content</div>;
    };

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<MainLayout {...defaultProps} />}>
            <Route index element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const testRouteContent = screen.getByTestId('test-route-content');
    expect(testRouteContent).toBeInTheDocument();
    expect(testRouteContent).toHaveTextContent('Test Route Content');
  });
});
