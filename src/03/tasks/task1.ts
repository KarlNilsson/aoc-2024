import { readFile } from 'fs/promises';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/03/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  let result = 0;

  dataLines.forEach((dataLine) => {
    const matches = dataLine.matchAll(/mul\((\d+),(\d+)\)/g);

    for (const match of matches) {
      result += parseInt(match[1], 10) * parseInt(match[2], 10);
    }
  })

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }
  return result;
};


export default Task;
