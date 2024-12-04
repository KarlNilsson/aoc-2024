import { readFile } from 'fs/promises';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/04/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  let numXmas = 0;
  for (let idxY = 1; idxY < dataLines.length - 1; idxY += 1) {
    const letters = dataLines[idxY];

    for (let idxX = 1; idxX < letters.length; idxX += 1) {
      const letter = letters[idxX];
      if (letter !== 'A') {
        continue;
      }
      const topLeft = dataLines[idxY - 1][idxX - 1];
      const topRight = dataLines[idxY - 1][idxX + 1];
      const bottomLeft = dataLines[idxY + 1][idxX - 1];
      const bottomRight = dataLines[idxY + 1][idxX + 1];
      if (![topLeft, topRight, bottomLeft, bottomRight].every((letter) => ['M', 'S'].includes(letter))) {
        continue;
      }
      if (topLeft === bottomRight) {
        continue;
      }

      if (
        (topLeft === topRight) && (bottomLeft === bottomRight) && (topLeft !== bottomLeft) ||
        (topLeft === bottomLeft) && (topRight === bottomRight) && (topLeft !== topRight)
      ) {
        numXmas++;
      }
    }
  }

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return numXmas;
};

export default Task;
