import { screen } from '@testing-library/react';
import { renderWithRouter } from '../testUtils';

describe('renderWithRouter', () => {
  it('renders the provided component wrapped with BrowserRouter', () => {
    const TestComponent = () => <div>Test Component</div>;
    renderWithRouter(<TestComponent />);

    const testComponent = screen.getByText('Test Component');
    expect(testComponent).toBeInTheDocument();
  });
});
