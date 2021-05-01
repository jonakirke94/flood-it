const colors = new Map();

colors.set('GREEN', 'bg-green-500');
colors.set('RED', 'bg-red-500');
colors.set('YELLOW', 'bg-yellow-500');
colors.set('TEAL', 'bg-teal-500');
colors.set('INDIGO', 'bg-indigo-500');
colors.set('PINK', 'bg-pink-500');

const animations = new Map();

animations.set('GREEN', 'box-green');
animations.set('RED', 'box-red');
animations.set('YELLOW', 'box-yellow');
animations.set('TEAL', 'box-teal');
animations.set('INDIGO', 'box-indigo');
animations.set('PINK', 'box-pink');

export const GRID_SIZE = 15;
export const MAX_FLOODS = 25;
export const COLORS = colors;
export const ANIMATIONS = animations;
export const ANIMATION_INCREMENT_IN_MS = 50;
