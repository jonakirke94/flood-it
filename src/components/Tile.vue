<template>
  <div :id="id" class="flex flex-wrap flex-shrink-0 text-white justify-center items-center text-xs">
    <template v-if="powerUp">
      <icon-fire-outline v-show="powerUp.name === 'fire'" class="w-5 h-5"></icon-fire-outline>
      <icon-heart-outline v-show="powerUp.name === 'health'" class="w-5 h-5"></icon-heart-outline>
    </template>
    <!--<span v-if="tile.powerUp === 'rotate'">R</span>-->
  </div>
</template>

<script>
import IconFireOutline from '../components/icons/IconFireOutline.vue';
import IconHeartOutline from '../components/icons/IconHeartOutline.vue';

export default {
  components: {
    IconFireOutline,
    IconHeartOutline,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    powerUp: {
      type: [Object, String],
      default: () => null,
    },
  },
};
</script>

<style></style>
