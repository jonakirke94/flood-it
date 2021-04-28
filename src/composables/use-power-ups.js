import { reactive } from 'vue';

let turnedPowerUps = reactive([]);

const firePowerUp = {
  name: 'fire',
};

const healthPowerUp = {
  name: 'health',
};

export const usePowerUps = function () {
  const getPowerUp = (gridSize) => {
    const rnd = Math.floor(Math.random() * 25);
    if (rnd > 1) return '';
    return [firePowerUp, healthPowerUp][rnd];
  };

  const addPowerUpIfExists = (tile) => {
    if (tile.powerUp) {
      // delay add until the dom element is animated
      setTimeout(() => {
        turnedPowerUps.push(tile.powerUp);
      }, tile.delay);
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
  };
};

export default usePowerUps;
