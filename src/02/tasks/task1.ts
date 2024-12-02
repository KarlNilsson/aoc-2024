import { readFile } from 'fs/promises';
import { tryNumberArray } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/02/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const safeLines = dataLines.filter((line) => {
    const numbers = line.split(' ').map((num) => parseInt(num, 10));
    return tryNumberArray(numbers);
  });

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return safeLines.length;
};

export default Task;
