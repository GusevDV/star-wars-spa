import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithRedux } from 'shared/utils';
import Home from '../Home';

describe('Home', () => {
  it('should display search', () => {
    renderWithRedux(<Home />);

    const search = screen.getByPlaceholderText('Search a hero');

    expect(search).toBeInTheDocument();
  });

  it('should render persons list', async () => {
    const names = [
      'Luke Skywalker',
      'C-3PO',
      'R2-D2',
      'Darth Vader',
      'Leia Organa',
      'Owen Lars',
      'Beru Whitesun lars',
      'R5-D4',
      'Biggs Darklighter',
      'Obi-Wan Kenobi',
    ];
    const skeletonTestId = 'skeleton';

    renderWithRedux(
      <Router>
        <Home />
      </Router>
    );

    await waitForElementToBeRemoved(() => screen.queryAllByTestId(skeletonTestId));

    const persons = names.map((name) => {
      return screen.getByText(name);
    });

    persons.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
