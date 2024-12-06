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

  const visitedTiles = tryWalking(guardMap, guardStartingPosition);
  if (!visitedTiles) {
    throw new Error(`Couldn't find an exit`);
  }

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  const visitedTilesTotal = visitedTiles.reduce(
    (accRow, row) =>
      (accRow + (row.reduce((accCell, cell) => accCell + (cell.length > 0 ? 1 : 0), 0)))
    , 0)

  return visitedTilesTotal;
};

export default Task;
