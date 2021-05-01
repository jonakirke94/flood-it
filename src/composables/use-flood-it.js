import useNeighbours from './use-neighbours';

import { getNextDelay } from '../util/ui-helpers';

import usePowerUps from './use-power-ups';

const floodedTiles = new Map();

let useFloodIt = (board) => {
  const { handleNeighbours } = useNeighbours(board);

  const { addPowerUpIfExists } = usePowerUps();

  const floodFill = (initialTile, newColor) => {
    const fillFromTile = () => {
      floodedTiles.clear();

      const fill = (firstTile, prevColor, newColor) => {
        firstTile.origin = 0;
        const tileStack = [firstTile];
        const lookaheadStack = [];

        while (tileStack.length) {
          const tile = tileStack.shift();

          if (tile.colorKey === newColor) {
            lookaheadStack.push(tile);
            continue;
          }

          if (tile.colorKey !== prevColor || floodedTiles.has(tile.id)) continue;

          if (tile.colorKey === prevColor) {
            tile.oldColorKey = tile.colorKey;
            tile.colorKey = newColor;
            tile.animationDelay = tile.id === firstTile.id ? 0 : getNextDelay(tile);
            tile.animated = true;
            floodedTiles.set(tile.id, tile);
            addPowerUpIfExists(tile);
          }

          handleNeighbours(tile, tileStack);
        }

        while (lookaheadStack.length) {
          const tile = lookaheadStack.shift();

          if (floodedTiles.has(tile.id) || tile.colorKey !== newColor) continue;

          if (tile.colorKey === newColor) {
            tile.animationDelay = getNextDelay(tile);
            tile.oldColorKey = newColor;
            tile.animated = true;
            floodedTiles.set(tile.id, tile);

            addPowerUpIfExists(tile);
          }

          handleNeighbours(tile, lookaheadStack);
        }
      };

      const prevColor = initialTile.colorKey;
      fill(initialTile, prevColor, newColor);
    };

    fillFromTile();
  };

  return {
    floodFill,
    floodedTiles,
  };
};

export default useFloodIt;
