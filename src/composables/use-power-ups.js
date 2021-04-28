import { reactive } from 'vue';

let turnedPowerUps = reactive([]);

// if we have multiple of the same powerups we need a unique identifier
const POWER_UPS = [
  {
    id: 1,
    name: 'fire',
    type: 'ASYNC',
  },
  {
    id: 2,
    name: 'health',
    type: 'INSTANT',
  },
  {
    id: 3,
    name: 'flag',
    type: 'ASYNC',
  },
];
export const usePowerUps = function () {
  // TODO need to calculate probabilities here
  const getPowerUp = (gridSize) => {
    const rnd = Math.floor(Math.random() * 15);
    if (rnd > POWER_UPS.length) return '';
    return POWER_UPS[rnd];
  };

  const addPowerUpIfExists = (tile) => {
    if (tile.powerUp) {
      // delay add until the dom element is animated
      if (!turnedPowerUps.includes(tile.powerUp)) {
        setTimeout(() => {
          turnedPowerUps.push(tile.powerUp);
        }, tile.animationDelay);
      }
    }
  };

  const removePowerUp = (powerUp) => {
    const indexOf = turnedPowerUps.indexOf(powerUp);
    if (indexOf > -1) {
      turnedPowerUps.splice(indexOf, 1);
    }
  };

  const resetPowerUps = () => {
    while (turnedPowerUps.length) {
      turnedPowerUps.pop();
    }
  };

  return {
    getPowerUp,
    addPowerUpIfExists,
    turnedPowerUps,
    resetPowerUps,
    removePowerUp,
  };
};

export default usePowerUps;
