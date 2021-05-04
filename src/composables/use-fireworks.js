import fx from 'fireworks';
import { watch, onUnmounted } from 'vue';

let useFireWorks = (show) => {
  let fn;

  const clear = () => {
    if (fn) {
      clearInterval(fn);
    }
  };

  const run = () => {
    const tileBoard = document.querySelector('.tileboard');
    fx({
      parentNode: tileBoard,
      canvasWidth: tileBoard.innerWidth,
      canvasHeight: tileBoard.innerWidth,
      x: tileBoard.offsetLeft + tileBoard.offsetWidth / 2,
      y: tileBoard.offsetTop + tileBoard.offsetHeight / 2 - 75,
      colors: ['#EF4444', '#6366F1', '#6366F1'],
    });
  };

  watch(show, (newVal) => {
    if (newVal) {
      fn = setInterval(run, 500);
    } else {
      clear();
    }
  });

  onUnmounted(() => {
    clear();
  });
};

export default useFireWorks;
