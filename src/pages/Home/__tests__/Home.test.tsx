import { screen } from '@testing-library/react';
import { renderWithRedux } from 'shared/utils';
import Home from '../Home';

describe('Home', () => {
  it('should display search', () => {
    renderWithRedux(<Home />);

    const search = screen.getByPlaceholderText('Search a hero');

    expect(search).toBeInTheDocument();
  });
});
