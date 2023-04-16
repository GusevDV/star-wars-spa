import { render, screen } from '@testing-library/react';

import Home from '../Home';

describe('Home', () => {
  it('renders headline', () => {
    render(<Home />);
    const welcomeText = screen.getByText('Welcome');

    expect(welcomeText).toBeInTheDocument();
  });
});
