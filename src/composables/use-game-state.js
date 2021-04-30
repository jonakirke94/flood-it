import { ref, reactive, computed } from 'vue';
import useFloodIt from './use-flood-it';
import useOptions from './use-options';
import usePowerUps from './use-power-ups';
import throttle from 'lodash.throttle';

let board = reactive([]);
let startTileId = ref('0-0');
const clicks = ref(0);
const activeTileId = ref('');
const hasWon = ref(false);

export const useGameState = function () {
  const { floodFill, floodedTiles } = useFloodIt(board);
  const { GRID_SIZE, MAX_FLOODS, randomColorKey } = useOptions();
  const { getPowerUp, activePowerUp, activeFireColor } = usePowerUps();

  const checkIfWon = function () {
    hasWon.value = floodedTiles.size === GRID_SIZE * GRID_SIZE;
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
        const powerUp = colorKey === startColor ? '' : getPowerUp();
        row.push({
          animated: false,
          animationDelay: 0,
          colorKey,
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
      return activeFireColor.value ? 'Select a cell to flood' : 'Select a color';
    }

    if (activePowerUp.value.name === 'flag') {
      return 'Select a new spring';
    }

    return '';
  });

  // (calculateLayout, 150)
  const playRound = throttle((newColor, tileToFlood) => {
    if (hasWon.value) {
      console.warn('The game is already won');
      return;
    }

    if (clicks.value >= MAX_FLOODS) {
      console.warn('Already used max clicks');
      return;
    }

    const [x, y] = (tileToFlood || startTileId.value).split('-');
    const startTile = board[x][y];
    floodFill(startTile, newColor);

    clicks.value++;

    checkIfWon();
  }, 300);

  const reset = () => {
    while (board.length) {
      board.pop();
    }

    startTileId.value = '0-0';
    activeTileId.value = '';
    clicks.value = 0;
    hasWon.value = false;
  };

  const removeAnimation = (tile) => {
    tile.animated = false;
  };

  return {
    playRound,
    clicks,
    hasWon,
    instantiateGame,
    board,
    reset,
    startTileId,
    activeTileId,
    removeAnimation,
    powerUpHelpText,
  };
};

export default useGameState;
