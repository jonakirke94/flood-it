<template>
  <div ref="root" class="w-full" :style="styles">
    <tile v-for="tile in tiles.flat()" :key="tile.id" :tile="tile"></tile>
  </div>
</template>

<script>
import Tile from '../components/Tile.vue';

import useOptions from '../composables/use-options';

import { ref, onMounted, onUnmounted, computed } from 'vue';

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
    const { GRID_SIZE } = useOptions();

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

    window.addEventListener('resize', getBoardWidth);

    onUnmounted(() => {
      window.removeEventListener('resize', getBoardWidth);
    });

    return {
      styles,
      root,
    };
  },
};
</script>

<style>
/*.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 500px;
  height: auto;
}*/
</style>
