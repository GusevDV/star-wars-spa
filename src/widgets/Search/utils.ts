export const debounce = <A extends unknown[], R = void>(
  callback: (...args: A) => R,
  timeout: number
) => {
  let timerId: null | ReturnType<typeof setTimeout> = null;

  return (...args: A) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
