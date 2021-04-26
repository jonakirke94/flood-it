import { reactive } from 'vue';

import axios from 'axios';

// if we put it outside of the function the state will persist between different uses
const emails = reactive(new Set());

export const composable = function (cb) {
  const execute = (args) => {
    cb(args);
  };

  return {
    execute,
  };
};

export default useEmailSelection;
