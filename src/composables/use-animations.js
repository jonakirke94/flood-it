import { nextTick } from 'vue';

let useAnimations = () => {
  const animate = (domElement, color) => {
    const className = `box-${color.toLowerCase()}`;
    const removeClass = () => {
      domElement.classList.remove(className);
      domElement.removeEventListener('animationend', removeClass);
    };

    domElement.addEventListener('animationend', removeClass);
    domElement.classList.add(className);
  };
  const animateList = (tileMap, domMap) => {
    nextTick(() => {
      tileMap.forEach(({ delay, color }, id) => {
        const domElement = domMap.get(id);
        domElement.style.animationDelay = `${delay.toFixed()}ms`;
        animate(domElement, color);
      });
    });
  };

  return {
    animateList,
  };
};

export default useAnimations;
