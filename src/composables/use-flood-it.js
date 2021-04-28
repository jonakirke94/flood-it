import useNeighbours from './use-neighbours';
import useAnimations from './use-animations';
import usePowerUps from './use-power-ups';

const floodedTiles = new Map();

let useFloodIt = (board) => {
  const { getNextDelay } = useAnimations();
  const { handleNeighbours } = useNeighbours(board);

  const { addPowerUpIfExists } = usePowerUps();

  const floodFill = (initialTile, newColor, doneCallback) => {
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
            tile.colorKey = newColor;
            tile.delay = getNextDelay(tile);
            floodedTiles.set(tile.id, tile);
          }

          handleNeighbours(tile, tileStack);
        }

        while (lookaheadStack.length) {
          const tile = lookaheadStack.shift();

          if (floodedTiles.has(tile.id) || tile.colorKey !== newColor) continue;

          if (tile.colorKey === newColor) {
            tile.delay = getNextDelay(tile);
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
    doneCallback(floodedTiles);
  };

  return {
    floodFill,
    floodedTiles,
  };
};

export default useFloodIt;
