import { snakeCaseToPhrase } from '../utils/utils';

describe('snakeCaseToPhrase', () => {
  it('should transform snake_case to a phrase or word', () => {
    expect(snakeCaseToPhrase('eye_color')).toBe('eye color');
    expect(snakeCaseToPhrase('hair')).toBe('hair');
    expect(snakeCaseToPhrase('second_eye_color')).toBe('second eye color');
  });

  it('should handle empty strings and strings without underscores', () => {
    expect(snakeCaseToPhrase('')).toBe('');
    expect(snakeCaseToPhrase('helloworld')).toBe('helloworld');
  });
});
