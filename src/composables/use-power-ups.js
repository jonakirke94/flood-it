import { reactive, computed, ref } from 'vue';
import useId from './use-id';

import { GRID_SIZE } from '../util/options';

const turnedPowerUps = reactive(new Map());
const executedPowerUps = reactive(new Set());
const activePowerUpId = ref('');
const activeFireColor = ref('');
let powerUpNames = reactive([]);

const POWER_UPS = ['fire', 'flag', 'health'];

const POWER_UP_LIMIT = {
  fire: 1,
  flag: 1,
  health: 3,
};

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

  const hasExceedLimit = (name) => {
    return powerUpNames.filter((pw) => pw === name).length >= POWER_UP_LIMIT[name];
  };

  const getPowerUp = (multiplier) => {
    // favour tiles towards bottom right
    const randomFactor = (GRID_SIZE * GRID_SIZE) / 2 - multiplier;
    const rnd = Math.floor(Math.random() * (randomFactor + 1));
    if (rnd > POWER_UPS.length - 1) return '';
    const name = POWER_UPS[rnd];

    if (hasExceedLimit(name)) return '';

    powerUpNames.push(name);

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
    powerUpNames = [];
    activePowerUpId.value = '';
    activeFireColor.value = '';
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
