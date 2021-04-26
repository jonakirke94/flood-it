const GRID_SIZE = 10;
const MAX_FLOODS = 25;

const colors = new Map();

colors.set('GREEN', 'bg-green-500');
colors.set('RED', 'bg-red-500');
colors.set('YELLOW', 'bg-yellow-500');
colors.set('TEAL', 'bg-teal-500');
colors.set('INDIGO', 'bg-indigo-500');
colors.set('PINK', 'bg-pink-500');

const neighbour = {
  LEFT: 'left',
  TOP: 'top',
  BOTTOM: 'bottom',
  RIGHT: 'right',
};

const validNeighbours = {};
validNeighbours[neighbour.LEFT] = (_x, y) => y > 0;
validNeighbours[neighbour.TOP] = (x, _y) => x > 0;
validNeighbours[neighbour.BOTTOM] = (x, _y) => x < GRID_SIZE;
validNeighbours[neighbour.RIGHT] = (_x, y) => y < GRID_SIZE;

import { reactive, ref } from 'vue';
import usePowerUps from './use-power-ups';

const board = reactive([]);

const clicks = ref(0);
const hasWon = ref(false);

export const useGameState = function () {
  const { getPowerUp, turnedPowerUps } = usePowerUps();

  const getColorKey = () => {
    const rnd = Math.floor(Math.random() * colors.size);
    return [...colors.keys()][rnd];
  };

  const generateBoard = function () {
    Array.from({ length: GRID_SIZE }).forEach((_x, x) => {
      const row = [];
      Array.from({ length: GRID_SIZE }).forEach((_x, y) => {
        const colorKey = getColorKey();
        row.push({
          color: colors.get(colorKey),
          x,
          y,
          powerUp: getPowerUp(),
          id: `${x}-${y}`,
        });
      });

      board.push(row);
    });
  };

  const checkIfWon = function (color) {
    const colorVal = colors.get(color);
    hasWon.value = board.flat().every((x) => x.color === colorVal);
  };

  const floodFill = function (color) {
    if (clicks.value >= MAX_FLOODS) {
      console.warn('Already used max clicks');
      return;
    }

    if (hasWon.value) {
      console.warn('The game is already won');
    }

    const seenTiles = new Set();
    const stack = [];

    const getNeighbours = function (x, y) {
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

    const initialTile = board[0][0];
    const initialColor = initialTile.color;

    const fill = (initialTile) => {
      stack.push(initialTile);

      while (stack.length) {
        console.log('running stack');
        // take the current tile
        const curr = stack.pop();

        // add it to seen
        seenTiles.add(curr.id);

        // color it to the new color
        curr.color = colors.get(color);

        getNeighbours(curr.x, curr.y).forEach((neighbour) => {
          if (!seenTiles.has(neighbour.id) && neighbour.powerUp) {
            console.log('powerup', neighbour.powerUp);
          }

          // skip if already seen
          if (seenTiles.has(neighbour.id)) {
            console.log('already seen tile');
            return;
          } else if (!seenTiles.has(neighbour.id) && neighbour.color === initialColor) {
            console.log('pushing to stack');
            stack.push(neighbour);
          }
        });
      }
    };

    fill(initialTile);

    clicks.value++;

    checkIfWon(color);
  };

  return {
    generateBoard,
    board,
    floodFill,
    clicks,
    hasWon,
  };
};

export default useGameState;
