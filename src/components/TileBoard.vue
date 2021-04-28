<template>
  <div class="flex flex-wrap max-w-screen-md mx-auto" :style="`width:600px`">
    <tile
      v-for="tile in tiles.flat()"
      :id="tile.id"
      :key="tile.id"
      :ref="setItemRef"
      :power-up="tile.powerUp"
      :style="getStyles()"
      class="flex flex-wrap flex-shrink-0 text-white justify-center items-center text-xs"
    ></tile>
  </div>
</template>

<script>
import Tile from '../components/Tile.vue';

import { onBeforeUpdate, onUpdated } from 'vue';

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
  emits: ['on-render'],
  setup(_props, { emit }) {
    let itemRefs = new Map();

    const setItemRef = (tileComponent) => {
      if (tileComponent) {
        itemRefs.set(tileComponent.$el.id, tileComponent.$el);
        emit('on-render', itemRefs);
      }
    };

    return {
      setItemRef,
    };
  },

  methods: {
    getStyles() {
      return {
        height: `${600 / this.tiles.length}px`,
        width: `${600 / this.tiles.length}px`,
      };
    },
  },
};
</script>

<style></style>
