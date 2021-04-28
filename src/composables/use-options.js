export const useOptions = function () {
  const GRID_SIZE = 10;
  const MAX_FLOODS = 25;

  const colors = new Map();

  const animations = new Map();

  colors.set('INDIGO-300', 'bg-indigo-300');
  colors.set('INDIGO-500', 'bg-indigo-500');
  colors.set('INDIGO-700', 'bg-indigo-700');

  colors.set('BLUE-300', 'bg-blue-300');
  colors.set('BLUE-500', 'bg-blue-500');
  colors.set('BLUE-700', 'bg-blue-700');

  animations.set('INDIGO-300', 'box-indigo-300');
  animations.set('INDIGO-500', 'box-indigo-500');
  animations.set('INDIGO-700', 'box-indigo-700');

  animations.set('BLUE-300', 'box-blue-300');
  animations.set('BLUE-500', 'box-blue-500');
  animations.set('BLUE-700', 'box-blue-700');

  /*colors.set('GREEN', 'bg-green-500');
  colors.set('RED', 'bg-red-500');
  colors.set('YELLOW', 'bg-yellow-500');
  colors.set('TEAL', 'bg-teal-500');
  colors.set('INDIGO', 'bg-indigo-500');
  colors.set('PINK', 'bg-pink-500');*/

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
