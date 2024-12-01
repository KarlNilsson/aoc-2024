export const splitColumns = (dataLines: string[]) => {
  return dataLines.reduce(
    ([lhs, rhs]: number[][], dataLine) => {
      const [left, right] = dataLine.split(/\s+/);
      lhs.push(parseInt(left, 10));
      rhs.push(parseInt(right, 10));
      return [lhs, rhs];
    },
    [[], []]
  );
};
