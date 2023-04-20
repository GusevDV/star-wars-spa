import { getPagesCount } from '../utils';

describe('getPagesCount', () => {
  test('should return 1 when itemsCount is less than pageSize', () => {
    const itemsCount = 5;
    const pageSize = 10;

    const pageCount = getPagesCount(itemsCount, pageSize);

    expect(pageCount).toBe(1);
  });

  test('should return 1 when itemsCount is equal pageSize', () => {
    const itemsCount = 10;
    const pageSize = 10;
    const pageCount = getPagesCount(itemsCount, pageSize);

    expect(pageCount).toBe(1);
  });

  test('should return the correct number of pages', () => {
    it('when itemsCount is greater than pageSize evenly divisible by pageSize:', () => {
      const itemsCount = 30;
      const pageSize = 10;
      const pageCount = getPagesCount(itemsCount, pageSize);

      expect(pageCount).toBe(3);
    });

    it('when is greater than pageSize and not evenly divisible by pageSize:', () => {
      const itemsCount = 27;
      const pageSize = 10;

      const pageCount = getPagesCount(itemsCount, pageSize);

      expect(pageCount).toBe(3);
    });
  });

  test('should return 0 when itemsCount is 0', () => {
    const itemsCount = 0;
    const pageSize = 10;

    const result = getPagesCount(itemsCount, pageSize);

    expect(result).toBe(0);
  });

  test('should return 0 when itemsCount is negative', () => {
    const itemsCount = -10;
    const pageSize = 10;

    const result = getPagesCount(itemsCount, pageSize);

    expect(result).toBe(0);
  });

  test('should return 0 when pageSize is 0', () => {
    const itemsCount = 10;
    const pageSize = 0;

    const result = getPagesCount(itemsCount, pageSize);

    expect(result).toBe(0);
  });

  test('should return 0 when pageSize is negative', () => {
    const itemsCount = 10;
    const pageSize = -10;

    const result = getPagesCount(itemsCount, pageSize);

    expect(result).toBe(0);
  });
});
