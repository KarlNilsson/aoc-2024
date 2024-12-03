import { readFile } from 'fs/promises';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/03/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  let result = 0;

  let active = true;
  dataLines.forEach((dataLine) => {
    const matches = dataLine.matchAll(/(do(n't)?\(\))|mul\((\d+),(\d+)\)/g);


    for (const match of matches) {
      if (match[0] === `don't()`) {
        active = false;
      } else if (match[0] === 'do()') {
        active = true;
      } else if (match[3] != null && active) {
        result += parseInt(match[3], 10) * parseInt(match[4], 10);
      }
    }
  })

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }
  return result;
};

export default Task;
