export const getPagesCount = (itemsCount: number, pageSize: number) => {
  if (itemsCount < 0 || pageSize <= 0) {
    return 0;
  }

  return Math.ceil(itemsCount / pageSize);
};
