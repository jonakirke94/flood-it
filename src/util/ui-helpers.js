import { COLORS, ANIMATION_INCREMENT_IN_MS } from './options';

const colorArray = [...COLORS.keys()];

export const getNextDelay = (tile) => {
  return (tile.origin || 0) + ANIMATION_INCREMENT_IN_MS;
};

export const randomColorKey = () => {
  const rnd = Math.floor(Math.random() * COLORS.size);
  return colorArray[rnd];
};
