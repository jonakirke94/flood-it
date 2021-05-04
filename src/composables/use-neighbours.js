import { GRID_SIZE } from '../util/options';

const NEIGHBOUR = {
  LEFT: 'left',
  TOP: 'top',
  BOTTOM: 'bottom',
  RIGHT: 'right',
};

const NEIGHBOUR_MAP = {
  [NEIGHBOUR.LEFT]: (_x, y) => y >= 0,
  [NEIGHBOUR.TOP]: (x, _y) => x >= 0,
  [NEIGHBOUR.BOTTOM]: (x, _y) => x < GRID_SIZE,
  [NEIGHBOUR.RIGHT]: (_x, y) => y < GRID_SIZE,
};

let useNeighbours = (board) => {
  const isValidNeighbour = (nb, x, y) => {
    return NEIGHBOUR_MAP[nb](x, y);
  };

  const getValidNeighbours = (x, y) => {
    const tiles = [];

    const addIfValid = (x, y, neighbour) => {
      if (isValidNeighbour(neighbour, x, y)) {
        tiles.push(board[x][y]);
      }
    };

    addIfValid(x, y - 1, NEIGHBOUR.LEFT);
    addIfValid(x, y + 1, NEIGHBOUR.RIGHT);
    addIfValid(x - 1, y, NEIGHBOUR.TOP);
    addIfValid(x + 1, y, NEIGHBOUR.BOTTOM);

    return tiles;
  };

  const handleNeighbours = (tile, stack) => {
    const neighbours = getValidNeighbours(tile.x, tile.y);

    stack.push(
      ...neighbours.map((nb) => {
        nb.origin = tile.animationDelay;
        return nb;
      })
    );
  };

  return {
    NEIGHBOUR,
    isValidNeighbour,
    handleNeighbours,
  };
};

export default useNeighbours;
