let counter = 0;

let useId = () => {
  const generateId = () => {
    counter++;
    return `floodit-${counter}`;
  };

  return {
    generateId,
  };
};

export default useId;
