<template>
  <div class="tileboard" :style="styles">
    <tile v-for="tile in tiles.flat()" :key="tile.id" :tile="tile"></tile>
  </div>
</template>

<script>
import Tile from '../components/Tile.vue';

import { computed } from 'vue';

import { GRID_SIZE } from '../util/options';

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
    const styles = computed(() => {
      return {
        'grid-template-columns': `repeat(${GRID_SIZE}, 1fr)`,
        'grid-template-rows': `repeat(${GRID_SIZE}, 1fr)`,
      };
    });
    return {
      styles,
    };
  },
};
</script>

<style scoped>
.tileboard {
  display: grid;
  width: calc(100% - 4rem);
  max-height: calc(100vh - 14rem);
  height: calc(100vh - 14rem);
}
.tileboard > * {
  width: 100%;
}
.tileboard > *::before {
  content: '';
  display: inline-block;
  width: 1px;
  height: 0;
  padding-bottom: 100%;
}
</style>
