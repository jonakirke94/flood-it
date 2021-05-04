import { ref, reactive, computed } from 'vue';

import { GRID_SIZE, MAX_FLOODS } from '../util/options';
import { randomColorKey } from '../util/ui-helpers';

import usePowerUps from './use-power-ups';
import throttle from 'lodash.throttle';
import useFloodIt from './use-flood-it';

let board = reactive([]);
let startTileId = ref('0-0');
const floods = ref(0);
const activeTileId = ref('');
const hasWon = ref(false);

export const useGameState = function () {
  const { floodFill, floodedTiles } = useFloodIt(board);
  const { getPowerUp, activePowerUp, activeFireColor, resetPowerUps } = usePowerUps();

  const checkIfWon = function () {
    hasWon.value = floodedTiles.size === GRID_SIZE * GRID_SIZE;
  };

  const newGame = () => {
    reset();
    resetPowerUps();
    instantiateGame();
  };

  const instantiateGame = () => {
    let startColor = '';
    Array.from({ length: GRID_SIZE }).forEach((_x, x) => {
      const row = [];
      Array.from({ length: GRID_SIZE }).forEach((_x, y) => {
        const colorKey = randomColorKey();
        if (x === 0 && y === 0) {
          startColor = colorKey;
        }

        // make sure we dont have powerups on start colors
        const powerUp = colorKey === startColor ? '' : getPowerUp(x * y);
        row.push({
          animated: false,
          animationDelay: 0,
          colorKey,
          oldColorKey: colorKey,
          x,
          y,
          powerUp: powerUp,
          id: `${x}-${y}`,
        });
      });

      board.push(row);
    });
  };

  const powerUpHelpText = computed(() => {
    if (!activePowerUp.value) return '';

    if (activePowerUp.value.name === 'fire') {
      return activeFireColor.value ? 'Select a tile to flood' : 'Select a color';
    }

    if (activePowerUp.value.name === 'flag') {
      return 'Select a new starting position';
    }

    return '';
  });

  const hasUsedMaxFloods = computed(() => {
    return floods.value >= MAX_FLOODS;
  });

  const playRound = throttle((newColor, tileToFlood) => {
    if (hasWon.value) {
      console.warn('The game is already won');
      return;
    }

    if (hasUsedMaxFloods.value) {
      console.warn('Already used max floods');
      return;
    }

    const [x, y] = (tileToFlood || startTileId.value).split('-');
    const startTile = board[x][y];

    if (startTile.colorKey === newColor) {
      console.warn('Attempting to set same color');
      return;
    }

    floodFill(startTile, newColor);

    floods.value++;

    checkIfWon();
  }, 300);

  const reset = () => {
    while (board.length) {
      board.pop();
    }

    startTileId.value = '0-0';
    activeTileId.value = '';
    floods.value = 0;
    hasWon.value = false;
  };

  const removeAnimation = (tile) => {
    tile.animated = false;
  };

  return {
    playRound,
    floods,
    hasWon,
    newGame,
    board,
    startTileId,
    hasUsedMaxFloods,
    activeTileId,
    removeAnimation,
    powerUpHelpText,
  };
};

export default useGameState;
