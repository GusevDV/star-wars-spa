import { render, screen } from '@testing-library/react';

import App from '../App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const welcomeText = screen.getByText('Welcome');

    expect(welcomeText).toBeInTheDocument();
  });
});
