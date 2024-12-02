export type Direction = 'asc' | 'desc';

export const tryNumberArray = (numbers: number[]): boolean => {
  const directionImplication = numbers[1] - numbers[0];
  if (directionImplication == 0) {
    return false;
  }
  const direction: Direction = directionImplication > 0 ? 'asc' : 'desc';

  for (let i = 1; i < numbers.length; i += 1) {
    const diff = numbers[i] - numbers[i - 1];
    if (diff === 0 || Math.abs(diff) > 3) {
      return false;
    }
    if (
      (direction === 'asc' && diff < 0) ||
      (direction === 'desc' && diff > 0)
    ) {
      return false;
    }
  }
  return true;
};
