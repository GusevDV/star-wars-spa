export const snakeCaseToPhrase = (snakeCaseString: string): string => {
  const words = snakeCaseString.split('_');
  return words.join(' ');
};
