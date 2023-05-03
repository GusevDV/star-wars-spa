import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Error, { ErrorCodes } from '../Error';

describe('Error', () => {
  it('renders the correct title and message for a network error', () => {
    render(<Error code={ErrorCodes.Network} />);

    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(screen.getByText('Please check your connection and try again.')).toBeInTheDocument();
  });

  it('renders the correct title and message for a timeout error', () => {
    render(<Error code={ErrorCodes.Timeout} />);

    expect(screen.getByText('Timeout')).toBeInTheDocument();
    expect(screen.getByText('Please try again.')).toBeInTheDocument();
  });

  it('renders the correct title and message for a canceled error', () => {
    render(<Error code={ErrorCodes.Canceled} />);

    expect(screen.getByText('Timeout')).toBeInTheDocument();
    expect(screen.getByText('Please try again.')).toBeInTheDocument();
  });

  it('renders the correct title and message for a not found error', () => {
    render(<Error code={ErrorCodes.NotFound} />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Check the site address.')).toBeInTheDocument();
  });

  it('renders the correct title and message for an unknown error', () => {
    render(<Error code="unknown" />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try to reload the page.')).toBeInTheDocument();
  });

  it('renders the reload button and calls the onReload function when the button is clicked', async () => {
    const onReload = vi.fn();
    render(<Error code={ErrorCodes.Network} onReload={onReload} />);

    const user = userEvent.setup();

    const reloadButton = screen.getByText('Reload');
    expect(reloadButton).toBeInTheDocument();

    await user.click(reloadButton);
    expect(onReload).toHaveBeenCalledTimes(1);
  });

  it('renders the reload button when is code Network', () => {
    const onReload = vi.fn();
    render(<Error code={ErrorCodes.Network} onReload={onReload} />);

    const reloadButton = screen.getByText('Reload');
    expect(reloadButton).toBeInTheDocument();
  });

  it('renders the reload button when is code Timeout', () => {
    const onReload = vi.fn();
    render(<Error code={ErrorCodes.Timeout} onReload={onReload} />);

    const reloadButton = screen.getByText('Reload');
    expect(reloadButton).toBeInTheDocument();
  });

  it('renders the reload button when is code Canceled', () => {
    const onReload = vi.fn();
    render(<Error code={ErrorCodes.Canceled} onReload={onReload} />);

    const reloadButton = screen.getByText('Reload');
    expect(reloadButton).toBeInTheDocument();
  });

  it('does not render the reload button when is code NotFound', () => {
    const onReload = vi.fn();
    render(<Error code={ErrorCodes.NotFound} onReload={onReload} />);

    const reloadButton = screen.queryByText('Reload');
    expect(reloadButton).not.toBeInTheDocument();
  });

  it('does not render the reload button when is code unkwnown', () => {
    const onReload = vi.fn();
    render(<Error code={'unkwnown'} onReload={onReload} />);

    const reloadButton = screen.queryByText('Reload');
    expect(reloadButton).not.toBeInTheDocument();
  });
});
