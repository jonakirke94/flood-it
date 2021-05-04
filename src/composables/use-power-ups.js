import { reactive, computed, ref } from 'vue';
import useId from './use-id';

import { GRID_SIZE } from '../util/options';

let turnedPowerUps = reactive(new Map());
let executedPowerUps = reactive(new Set());
let activePowerUpId = ref('');
let activeFireColor = ref('');

const POWER_UPS = ['fire', 'flag', 'health'];

/*const POWER_UP_LIMIT = {
  fire: 1,
  flag: 1,
  health: 3,
};*/

export const usePowerUps = function () {
  const { generateId } = useId();

  const activePowerUp = computed(() => {
    return turnedPowerUps.get(activePowerUpId.value);
  });

  const createPowerUp = (name) => {
    return {
      id: generateId(),
      name,
      type: name === 'health' ? 'INSTANT' : 'ASYNC',
    };
  };

  // TODO need to calculate probabilities here
  const getPowerUp = () => {
    const rnd = Math.floor(Math.random() * (GRID_SIZE + 1));
    if (rnd > POWER_UPS.length - 1) return '';
    const name = POWER_UPS[rnd];

    // if ()

    return createPowerUp(name);
  };

  const displayPowerUpList = computed(() => {
    return new Map([...turnedPowerUps].filter(([k, v]) => !executedPowerUps.has(k)));
  });

  const addPowerUpIfExists = (tile) => {
    if (tile.powerUp && !turnedPowerUps.has(tile.powerUp.id)) {
      // delay add until the dom element is animated
      setTimeout(() => {
        turnedPowerUps.set(tile.powerUp.id, tile.powerUp);
      }, tile.animationDelay);
    }
  };

  const atTileSelectionState = computed(() => {
    if (activePowerUp.value) {
      if (activePowerUp.value.name === 'flag') return true;

      if (activePowerUp.value.name === 'fire' && activeFireColor.value) return true;
    }

    return false;
  });

  const resetPowerUps = () => {
    turnedPowerUps.clear();
    executedPowerUps.clear();
  };

  return {
    getPowerUp,
    addPowerUpIfExists,
    turnedPowerUps,
    executedPowerUps,
    resetPowerUps,
    activePowerUp,
    activePowerUpId,
    activeFireColor,
    displayPowerUpList,
    atTileSelectionState,
  };
};

export default usePowerUps;
