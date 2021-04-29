import { reactive, computed, ref } from 'vue';
import useId from './use-id';
import useOptions from '../composables/use-options';

let turnedPowerUps = reactive(new Map());
let executedPowerUps = reactive(new Set());
let activePowerUpId = ref('');

const POWER_UPS = ['fire', 'flag', 'health'];

export const usePowerUps = function () {
  const { generateId } = useId();
  const { GRID_SIZE } = useOptions();

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
  const getPowerUp = (gridSize) => {
    const rnd = Math.floor(Math.random() * (GRID_SIZE + 1));
    if (rnd > 2) return '';
    const name = POWER_UPS[rnd];
    return createPowerUp(name);
  };

  const addPowerUpIfExists = (tile) => {
    if (tile.powerUp) {
      // delay add until the dom element is animated
      setTimeout(() => {
        turnedPowerUps.set(tile.powerUp.id, tile.powerUp);
      }, tile.animationDelay);
    }
  };

  const removePowerUp = (powerUp) => {
    turnedPowerUps.delete(powerUp.id);
  };

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
    removePowerUp,
    activePowerUp,
    activePowerUpId,
  };
};

export default usePowerUps;
