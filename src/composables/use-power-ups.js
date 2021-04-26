import { reactive, ref } from 'vue';

export const usePowerUps = function () {
  const turnedPowerUps = ref(new Set());
  const getPowerUp = () => {
    const rnd = Math.floor(Math.random() * 20);
    if (rnd > 1) return '';
    return ['bomb', 'rotate'][rnd];
  };

  return {
    getPowerUp,
    turnedPowerUps,
  };
};

export default usePowerUps;
