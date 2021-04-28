import { ref, reactive, nextTick } from 'vue';
import useFloodIt from './use-flood-it';
import useOptions from './use-options';
import usePowerUps from './use-power-ups';

let board = reactive([]);

export const useGameState = function () {
  const clicks = ref(0);
  const hasWon = ref(false);
  const { floodFill, floodedTiles } = useFloodIt(board);
  const { GRID_SIZE, MAX_FLOODS, randomColorKey } = useOptions();
  const { getPowerUp } = usePowerUps();

  const checkIfWon = function () {
    hasWon.value = floodedTiles.size === GRID_SIZE * GRID_SIZE;
  };

  const instantiateGame = (doneCallback) => {
    let startColor = '';
    Array.from({ length: GRID_SIZE }).forEach((_x, x) => {
      const row = [];
      Array.from({ length: GRID_SIZE }).forEach((_x, y) => {
        const colorKey = randomColorKey();
        if (x === 0 && y === 0) {
          startColor = colorKey;
        }

        // make sure we dont have powerups on start colors
        const powerUp = colorKey === startColor ? '' : getPowerUp(GRID_SIZE * GRID_SIZE);
        row.push({
          colorKey,
          x,
          y,
          powerUp: powerUp,
          id: `${x}-${y}`,
        });
      });

      board.push(row);
    });

    nextTick(() => {
      doneCallback(board.flat());
    });
  };

  const playRound = function (newColor, cb) {
    if (hasWon.value) {
      console.warn('The game is already won');
      return;
    }

    if (clicks.value >= MAX_FLOODS) {
      console.warn('Already used max clicks');
      return;
    }

    const topLeftTile = board[0][0];
    floodFill(topLeftTile, newColor, cb);

    clicks.value++;

    checkIfWon();
  };

  const reset = () => {
    while (board.length) {
      board.pop();
    }

    clicks.value = 0;
    hasWon.value = false;
  };

  return {
    playRound,
    clicks,
    hasWon,
    instantiateGame,
    board,
    reset,
  };
};

export default useGameState;
