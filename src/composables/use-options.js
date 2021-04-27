export const useOptions = function () {
  const GRID_SIZE = 10;
  const MAX_FLOODS = 25;

  const colors = new Map();

  colors.set('GREEN', 'bg-green-500');
  colors.set('RED', 'bg-red-500');
  colors.set('YELLOW', 'bg-yellow-500');
  colors.set('TEAL', 'bg-teal-500');
  colors.set('INDIGO', 'bg-indigo-500');
  colors.set('PINK', 'bg-pink-500');

  const colorArray = [...colors.keys()];

  const randomColorKey = () => {
    const rnd = Math.floor(Math.random() * colors.size);
    return colorArray[rnd];
  };

  return {
    GRID_SIZE,
    MAX_FLOODS,
    colors,
    randomColorKey,
  };
};

export default useOptions;
