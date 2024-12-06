export type Tile = '#' | '^' | '.';

export type Coordinate = [number, number];

enum Direction {
    Up,
    Right,
    Down,
    Left
}

export type VisitedTile = Direction[];
export type VisitedMap = VisitedTile[][];

const rotateGuard = (direction: Direction): Direction => (direction + 1) % 4;

export const tryWalking = (
    guardMap: Tile[][],
    guardStartingPosition: Coordinate
): VisitedMap | false => {
    const visitedTiles: VisitedMap = guardMap.map((row) => row.map(() => []))

    let [guardY, guardX] = guardStartingPosition;
    visitedTiles[guardY][guardX] = [Direction.Up];
    let guardDirection: Direction = Direction.Up;
    let stepCounter = 0;

    while (true) {
        let [tileY, tileX] = [guardY, guardX];
        switch (guardDirection) {
            case Direction.Up:
                tileY = guardY - 1;
                break;
            case Direction.Right:
                tileX = guardX + 1;
                break;
            case Direction.Down:
                tileY = guardY + 1;
                break;
            case Direction.Left:
                tileX = guardX - 1;
                break;
            default:
                throw new Error('Unknown direction');

        }

        if (tileX < 0 || tileX >= guardMap[0].length || tileY < 0 || tileY >= guardMap.length) {
            stepCounter += 1;
            break;
        }

        if (guardMap[tileY][tileX] === '.') {
            [guardY, guardX] = [tileY, tileX];
            stepCounter += 1;
            const tileToVisit = visitedTiles[tileY][tileX];
            if (tileToVisit.includes(guardDirection)) {
                return false;
            }
            visitedTiles[tileY][tileX] = [...tileToVisit, guardDirection]
        } else if (guardMap[tileY][tileX] === '#') {
            guardDirection = rotateGuard(guardDirection);
        }
    }

    return visitedTiles;
}