import { onUnmounted } from 'vue';

// register different keys with different functions
let useKeydown = (keyCombos) => {
  const onKeydown = (e) => {
    let kc = keyCombos.find((kc) => kc.key === e.key);
    if (kc) {
      kc.fn();
    }
  };

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
  });

  window.addEventListener('keydown', onKeydown);
};

export default useKeydown;
