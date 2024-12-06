import { readFile } from 'fs/promises';
import { Coordinate, Tile, tryWalking } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/06/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  let guardStartingPosition: Coordinate = [0, 0];

  const guardMap: Tile[][] = dataLines
    .map((dataLine, idxY) => [...dataLine].map((tile, idxX): Tile => {
      if (tile === '#') {
        return '#';
      }
      if (tile === '^') {
        guardStartingPosition = [idxY, idxX];
        return '.';
      }
      return '.';
    }));

  // Do an initial walk to find the path. We only need to try obstacles
  // that are adjacent to the actual walking path
  const testWalk = tryWalking(guardMap, guardStartingPosition);

  // A set of string is easier to handle than a set of coordinates
  const candidatePositions = new Set<string>();
  if (testWalk !== false) {
    for (let i = 0; i < testWalk.length; i += 1) {
      for (let j = 0; j < testWalk[i].length; j += 1) {

        const tile = testWalk[i][j];
        if (tile.length > 0) {
          candidatePositions.add(`${i},${j}`);
        }
      }
    }
  }

  let obstacleCounter = 0;
  for (let y = 0; y < guardMap.length; y += 1) {
    for (let x = 0; x < guardMap[y].length; x += 1) {
      const tile = guardMap[y][x]
      if (['#', '^'].includes(tile) || !candidatePositions.has(`${y},${x}`)) {
        continue;
      }

      guardMap[y][x] = '#';
      if (!tryWalking(guardMap, guardStartingPosition)) {
        obstacleCounter += 1;
      }
      guardMap[y][x] = tile;
    }
  }

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }
  return obstacleCounter;
};

export default Task;
