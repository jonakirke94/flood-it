const PREFIX = 'flood-it';

let counter = 0;

let useId = () => {
  const generateId = () => {
    counter++;
    return `${PREFIX}${counter}`;
  };

  return {
    generateId,
  };
};

export default useId;
