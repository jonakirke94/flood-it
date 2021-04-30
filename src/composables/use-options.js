export const useOptions = function () {
  const GRID_SIZE = 15;
  const MAX_FLOODS = 25;

  const colors = new Map();

  const animations = new Map();

  colors.set('GREEN', 'bg-green-500');
  colors.set('RED', 'bg-red-500');
  colors.set('YELLOW', 'bg-yellow-500');
  colors.set('TEAL', 'bg-teal-500');
  colors.set('INDIGO', 'bg-indigo-500');
  colors.set('PINK', 'bg-pink-500');

  animations.set('GREEN', 'box-green');
  animations.set('RED', 'box-red');
  animations.set('YELLOW', 'box-yellow');

  animations.set('TEAL', 'box-teal');
  animations.set('INDIGO', 'box-indigo');
  animations.set('PINK', 'box-pink');

  const colorArray = [...colors.keys()];

  const randomColorKey = () => {
    const rnd = Math.floor(Math.random() * colors.size);
    return colorArray[rnd];
  };

  return {
    GRID_SIZE,
    MAX_FLOODS,
    colors,
    animations,
    randomColorKey,
  };
};

export default useOptions;
