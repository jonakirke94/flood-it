import { nextTick } from 'vue';
import useOptions from './use-options';

let useAnimations = () => {
  const { colors } = useOptions();

  const ANIMATION_INCREMENT_IN_MS = 50;

  const animate = (domElement, color) => {
    const className = `box-${color.toLowerCase()}`;
    const removeClass = () => {
      domElement.classList.remove(...colors.values(), className);
      domElement.classList.add(colors.get(color));
      domElement.removeEventListener('animationend', removeClass);
    };

    domElement.addEventListener('animationend', removeClass);
    domElement.classList.add(className);
  };
  const animateList = (tileMap, domMap) => {
    nextTick(() => {
      tileMap.forEach(({ delay, colorKey }, id) => {
        const domElement = domMap.get(id);
        domElement.style.animationDelay = `${delay}ms`;

        setTimeout(() => {
          domElement.innerHTML = '';
        }, delay);

        animate(domElement, colorKey);
      });
    });
  };

  const addInitialColors = (tiles, itemRefs) => {
    tiles.forEach((tile) => {
      const domElement = itemRefs.get(tile.id);
      domElement.classList.remove(...colors.values());
      domElement.classList.add(colors.get(tile.colorKey));
    });
  };

  const getNextDelay = (tile) => {
    return (tile.origin || 0) + ANIMATION_INCREMENT_IN_MS;
  };

  return {
    animateList,
    addInitialColors,
    getNextDelay,
  };
};

export default useAnimations;
