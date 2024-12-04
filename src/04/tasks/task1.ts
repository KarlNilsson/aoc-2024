import { readFile } from 'fs/promises';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/04/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  let numXmas = 0;

  dataLines.forEach((dataLine, idxY) => {
    const fwMatches = dataLine.match(/XMAS/g);
    const bwMatches = dataLine.match(/SAMX/g);

    const fwMatchLen = fwMatches?.length ?? 0;
    const bwMatchLen = bwMatches?.length ?? 0;

    numXmas += fwMatchLen + bwMatchLen;

    const letters = [...dataLine];
    letters.forEach((letter, idxX) => {
      if (letter === 'X') {
        if (idxY < dataLines.length - 3) {
          if (
            dataLines[idxY + 1][idxX] === 'M' &&
            dataLines[idxY + 2][idxX] === 'A' &&
            dataLines[idxY + 3][idxX] === 'S'
          ) {
            numXmas++;
          }
          if (idxX < letters.length - 3) {
            if (
              dataLines[idxY + 1][idxX + 1] === 'M' &&
              dataLines[idxY + 2][idxX + 2] === 'A' &&
              dataLines[idxY + 3][idxX + 3] === 'S'
            ) {
              numXmas++;
            }
          }
          if (idxX > 2) {
            if (
              dataLines[idxY + 1][idxX - 1] === 'M' &&
              dataLines[idxY + 2][idxX - 2] === 'A' &&
              dataLines[idxY + 3][idxX - 3] === 'S'
            ) {
              numXmas++;
            }
          }
        }
        if (idxY > 2) {
          if (
            dataLines[idxY - 1][idxX] === 'M' &&
            dataLines[idxY - 2][idxX] === 'A' &&
            dataLines[idxY - 3][idxX] === 'S'
          ) {
            numXmas++;
          }
          if (idxX < letters.length - 3) {
            if (
              dataLines[idxY - 1][idxX + 1] === 'M' &&
              dataLines[idxY - 2][idxX + 2] === 'A' &&
              dataLines[idxY - 3][idxX + 3] === 'S'
            ) {
              numXmas++;
            }
          }
          if (idxX > 2) {
            if (
              dataLines[idxY - 1][idxX - 1] === 'M' &&
              dataLines[idxY - 2][idxX - 2] === 'A' &&
              dataLines[idxY - 3][idxX - 3] === 'S'
            ) {
              numXmas++;
            }
          }
        }
      }
    })
  })

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return numXmas;
};

export default Task;
