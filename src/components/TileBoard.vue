<template>
  <div class="flex flex-wrap max-w-screen-md mx-auto" :style="`width:600px`">
    <tile
      v-for="tile in tiles.flat()"
      :key="tile.id"
      :tile="tile"
      :height="600 / tiles.length"
      :width="600 / tiles.length"
      class="flex flex-wrap flex-shrink-0 text-white justify-center items-center text-xs"
    ></tile>
  </div>
</template>

<script>
import Tile from '../components/Tile.vue';

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
};
</script>

<style></style>
