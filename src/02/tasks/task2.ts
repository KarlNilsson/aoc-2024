import { readFile } from 'fs/promises';
import { tryNumberArray } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/02/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const safeLines = dataLines.filter((line) => {
    let numbers = line.split(' ').map((num) => parseInt(num, 10));
    if (tryNumberArray(numbers)) {
      return true;
    }
    for (let i = 0; i < numbers.length; i += 1) {
      const splicedArray = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
      if (tryNumberArray(splicedArray)) {
        return true;
      }
    }
    return false;
  });

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return safeLines.length;
};

export default Task;
