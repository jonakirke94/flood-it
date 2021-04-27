import { ref } from 'vue';
import useFloodIt from './use-flood-it';
import useOptions from './use-options';

export const useGameState = function () {
  const clicks = ref(0);
  const hasWon = ref(false);
  const { floodFill, floodedTiles } = useFloodIt();
  const { GRID_SIZE, MAX_FLOODS } = useOptions();

  const checkIfWon = function () {
    hasWon.value = floodedTiles.size === GRID_SIZE * GRID_SIZE;
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

    const res = floodFill(newColor);
    cb(res);

    clicks.value++;

    checkIfWon();
  };

  return {
    playRound,
    clicks,
    hasWon,
  };
};

export default useGameState;
