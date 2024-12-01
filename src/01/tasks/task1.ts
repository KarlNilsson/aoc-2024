import { readFile } from 'fs/promises';
import { splitColumns } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/01/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const [leftColumn, rightColumn] = splitColumns(dataLines);
  const sortedLeftColumn = leftColumn.sort((a, b) => a - b);
  const sortedRightColumn = rightColumn.sort((a, b) => a - b);

  const diffColumn = sortedLeftColumn.reduce((acc: number[], left, idx) => {
    const right = sortedRightColumn[idx];
    acc.push(Math.abs(right - left));
    return acc;
  }, []);

  const sum = diffColumn.reduce((acc, curr) => acc + curr, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }
  return sum;
};

export default Task;
