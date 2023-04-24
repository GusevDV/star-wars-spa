import { screen } from '@testing-library/react';
import { routes } from 'shared/config';
import { renderWithRouter } from 'shared/utils';
import PersonCard, { PersonCardProps } from '../ui/PersonCard';

describe('PersonCard', () => {
  const defaultProps: PersonCardProps = {
    id: 1,
    name: 'Luke Skywalker',
  };

  it('displays the avatar, name, and link', () => {
    renderWithRouter(<PersonCard {...defaultProps} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();

    const name = screen.getByText(defaultProps.name);
    expect(name).toBeInTheDocument();

    const linkOverlay = screen.getByRole('link');
    expect(linkOverlay).toBeInTheDocument();
    expect(linkOverlay).toHaveAttribute(
      'href',
      routes.person.replace(':id', String(defaultProps.id))
    );
  });

  it('renders the correct name and link for a different person', () => {
    const differentProps: PersonCardProps = {
      id: 2,
      name: 'Darth Vader',
    };

    renderWithRouter(<PersonCard {...differentProps} />);

    const name = screen.getByText(differentProps.name);
    expect(name).toBeInTheDocument();

    const linkOverlay = screen.getByRole('link');
    expect(linkOverlay).toBeInTheDocument();
    expect(linkOverlay).toHaveAttribute(
      'href',
      routes.person.replace(':id', String(differentProps.id))
    );
  });
});
