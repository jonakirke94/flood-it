import useOptions from './use-options';
import useAnimations from './use-animations';
import { reactive } from 'vue';

const board = reactive([]);
const floodedTiles = new Set();

let useFloodIt = () => {
  let iteration = 1;

  const { randomColorKey, GRID_SIZE } = useOptions();
  const { animateList } = useAnimations();

  const neighbour = {
    LEFT: 'left',
    TOP: 'top',
    BOTTOM: 'bottom',
    RIGHT: 'right',
  };

  const validNeighbours = {};
  validNeighbours[neighbour.LEFT] = (_x, y) => y >= 0;
  validNeighbours[neighbour.TOP] = (x, _y) => x >= 0;
  validNeighbours[neighbour.BOTTOM] = (x, _y) => x < GRID_SIZE;
  validNeighbours[neighbour.RIGHT] = (_x, y) => y < GRID_SIZE;

  const generateBoard = () => {
    Array.from({ length: GRID_SIZE }).forEach((_x, x) => {
      const row = [];
      Array.from({ length: GRID_SIZE }).forEach((_x, y) => {
        row.push({
          colorKey: randomColorKey(),
          x,
          y,
          powerUp: '',
          id: `${x}-${y}`,
        });
      });

      board.push(row);
    });
  };

  const floodFill = (newColor) => {
    const getNeighbours = (x, y) => {
      const tiles = [];

      const addIfValid = (x, y, neighbour) => {
        if (validNeighbours[neighbour](x, y)) {
          tiles.push(board[x][y]);
        }
      };

      addIfValid(x, y - 1, neighbour.LEFT);
      addIfValid(x, y + 1, neighbour.RIGHT);
      addIfValid(x - 1, y, neighbour.TOP);
      addIfValid(x + 1, y, neighbour.BOTTOM);

      return tiles;
    };

    const fill = (initialTile) => {
      const visited = new Set();

      const tileMap = new Map();

      const ANIMATION_INCREMENT = 50;

      const lookAheadRecursively = (tile, prevColor, newColor, delay) => {
        if (visited.has(tile.id)) return;

        if (tile.iteration === iteration) return;

        if (tile.colorKey !== newColor) return;

        if (tile.colorKey === newColor) {
          floodedTiles.add(tile.id);
          tile.iteration = iteration;

          if (!visited.has(tile.id)) {
            tileMap.set(tile.id, { delay: delay, color: tile.colorKey });
          }
          if (tile.powerUp) {
            // turnedPowerUps.value.add(tile.powerUp);
          }
        }

        const neighbours = getNeighbours(tile.x, tile.y);

        const lockedDelay = delay;
        neighbours.forEach((neighbour) => {
          lookAheadRecursively(neighbour, prevColor, newColor, lockedDelay + ANIMATION_INCREMENT);
        });
      };

      const fillRecursively = (tile, prevColor, newColor, delay = 0) => {
        if (tile.colorKey === newColor) {
          lookAheadRecursively(tile, prevColor, newColor, delay);
          return;
        }

        if (tile.colorKey !== prevColor) return;

        if (visited.has(tile.id)) return;

        if (tile.colorKey === prevColor) {
          tile.colorKey = newColor;
          floodedTiles.add(tile.id);
          visited.add(tile.id);
          tileMap.set(tile.id, { delay, color: tile.colorKey });
        }

        const neighbours = getNeighbours(tile.x, tile.y);

        const lockedDelay = delay;
        neighbours.forEach((neighbour) => {
          fillRecursively(neighbour, prevColor, newColor, lockedDelay + ANIMATION_INCREMENT);
        });
      };

      const prevColor = initialTile.colorKey;
      fillRecursively(initialTile, prevColor, newColor);

      iteration++;

      return tileMap;
    };

    const initialTile = board[0][0];
    return fill(initialTile);
  };

  return {
    floodFill,
    floodedTiles,
    generateBoard,
    board,
  };
};

export default useFloodIt;
