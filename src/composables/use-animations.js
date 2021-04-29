let useAnimations = () => {
  const ANIMATION_INCREMENT_IN_MS = 50;

  const getNextDelay = (tile) => {
    return (tile.origin || 0) + ANIMATION_INCREMENT_IN_MS;
  };

  return {
    getNextDelay,
  };
};

export default useAnimations;
