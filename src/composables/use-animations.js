import { nextTick } from 'vue';
import useOptions from './use-options';

let useAnimations = () => {
  const { colors } = useOptions();

  const ANIMATION_INCREMENT_IN_MS = 50;

  /* const animate = (domElement, color) => {
    const className = `box-${color.toLowerCase()}`;
    console.log(className, 'className');
    const removeClass = () => {
      domElement.classList.remove(...colors.values(), className);
      domElement.classList.add(colors.get(color));
      domElement.removeEventListener('animationend', removeClass);
    };

    domElement.addEventListener('animationend', removeClass);
    domElement.classList.add(className);
  };
  const animateList = (tileMap) => {
    nextTick(() => {
      tileMap.forEach((tile) => {
        tile.animated = true;
      });
    });
  };*/

  const getNextDelay = (tile) => {
    return (tile.origin || 0) + ANIMATION_INCREMENT_IN_MS;
  };

  return {
    getNextDelay,
  };
};

export default useAnimations;
