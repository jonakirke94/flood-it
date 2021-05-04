<template>
  <div ref="root" class="tileboard" :style="styles">
    <tile v-for="tile in tiles.flat()" :key="tile.id" :size="tileSize" :tile="tile"></tile>
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
    let root = ref();
    let tileSize = ref(0);

    const getBoardHeight = () => {
      const size = root.value.clientHeight;
      tileSize.value = size / GRID_SIZE;
    };

    onMounted(() => {
      getBoardHeight();
    });

    const styles = computed(() => {
      return {
        display: 'grid',
        'grid-template-columns': `repeat(${GRID_SIZE}, 1fr)`,
        'grid-template-rows': `repeat(${GRID_SIZE}, 1fr)`,
        width: `${GRID_SIZE * tileSize.value}px`,
      };
    });

    const fnc = debounce(getBoardHeight, 100);
    window.addEventListener('resize', fnc);

    onUnmounted(() => {
      window.removeEventListener('resize', fnc);
    });

    return {
      styles,
      tileSize,
      root,
    };
  },
};
</script>

<style scoped>
.tileboard {
  max-height: calc(100vh - 14rem);
  height: calc(100vh - 14rem);
}
</style>
