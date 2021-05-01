<template>
  <div ref="root" class="w-full" :style="styles">
    <tile v-for="tile in tiles.flat()" :key="tile.id" :tile="tile"></tile>
  </div>
</template>

<script>
import Tile from '../components/Tile.vue';

import { ref, onMounted, onUnmounted, computed } from 'vue';

import { GRID_SIZE } from '../util/options';

import debounce from 'lodash.debounce';

export default {
  components: {
    Tile,
  },
  props: {
    tiles: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    let boardHeight = ref(0);
    let root = ref();

    const getBoardWidth = () => {
      const width = root.value.clientWidth;
      boardHeight.value = width;
    };

    onMounted(() => {
      getBoardWidth();
    });

    const styles = computed(() => {
      return {
        display: 'grid',
        'grid-template-columns': `repeat(${GRID_SIZE}, 1fr)`,
        'grid-template-rows': `repeat(${GRID_SIZE}, 1fr)`,
        height: `${boardHeight.value}px`,
      };
    });

    const fnc = debounce(getBoardWidth, 100);
    window.addEventListener('resize', fnc);

    onUnmounted(() => {
      window.removeEventListener('resize', fnc);
    });

    return {
      styles,
      root,
    };
  },
};
</script>
