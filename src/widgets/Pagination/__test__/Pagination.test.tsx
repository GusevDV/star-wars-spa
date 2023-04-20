import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Pagination from '../Pagination';

const nextButtonText = 'Next';
const backButtonText = 'Back';

describe('Pagination', () => {
  test('next and previous button should disabled when page is loading', () => {
    render(
      <Pagination
        currentPage={1}
        totalCount={30}
        pageSize={10}
        isLoading={true}
        onPageChange={vi.fn()}
      />
    );

    const prevButton = screen.getByText(nextButtonText);
    const nextButton = screen.getByText(backButtonText);

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  test('previous button should disabled on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalCount={30}
        pageSize={10}
        isLoading={false}
        onPageChange={vi.fn()}
      />
    );

    const prevButton = screen.getByText(backButtonText);

    expect(prevButton).toBeDisabled();
  });

  test('next button should disabled on the last page', () => {
    render(
      <Pagination
        currentPage={3}
        totalCount={30}
        pageSize={10}
        isLoading={false}
        onPageChange={vi.fn()}
      />
    );

    const nextButton = screen.getByText(nextButtonText);

    expect(nextButton).toBeDisabled();
  });

  test('onPageChange should called with next page arg when user clicks to next button', async () => {
    const handlePageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalCount={30}
        pageSize={10}
        isLoading={false}
        onPageChange={handlePageChange}
      />
    );

    const user = userEvent.setup();
    const nextButton = screen.getByText(nextButtonText);

    await user.click(nextButton);

    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  test('onPageChange should called with prev page arg when user clicks to back button', async () => {
    const handlePageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalCount={30}
        pageSize={10}
        isLoading={false}
        onPageChange={handlePageChange}
      />
    );

    const user = userEvent.setup();
    const nextButton = screen.getByText(nextButtonText);

    await user.click(nextButton);

    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
});
