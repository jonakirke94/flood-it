<template>
  <ul>
    <li v-for="(powerUp, index) in powerUps" :key="index">
      <button class="h-12 w-12 bg-black text-white flex justify-center items-center rounded-md">
        <icon-fire-outline v-show="powerUp.name === 'fire'" class="w-6 h-6"></icon-fire-outline>
        <icon-heart-outline v-show="powerUp.name === 'health'" class="w-6 h-6"></icon-heart-outline>
      </button>
    </li>
  </ul>
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
    powerUps: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
