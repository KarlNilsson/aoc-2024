import { readFile } from 'fs/promises';
import { splitColumns } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/01/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const [leftColumn, rightColumn] = splitColumns(dataLines);

  const cache: Record<number, number> = {};

  let sum = 0;

  leftColumn.forEach((left) => {
    if (cache[left] == null) {
      const appearances = rightColumn.filter((right) => right === left).length;
      cache[left] = left * appearances;
    }
    sum += cache[left];
    return;
  });

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return sum;
};

export default Task;
