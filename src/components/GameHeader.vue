<template>
  <div class="flex justify-between w-full items-center h-24">
    <h1 class="text-3xl font-extrabold text-gray-100 md:ml-0 ml-4">Floods {{ count }}/{{ max }}</h1>

    <div class="flex space-x-4 mt-2">
      <button
        class="h-10 w-10 flex justify-center items-center bg-gray-700 focus:outline-none bg-transparent text-sm rounded-full transition-colors hover:text-white"
        @click="showInfo = !showInfo"
      >
        <icon-information-circle-outline class="w-4 h-4"></icon-information-circle-outline>
      </button>

      <button
        class="h-10 w-10 flex justify-center items-center bg-gray-700 focus:outline-none bg-transparent text-sm rounded-full transition-colors hover:text-white"
        @click="$emit('reset')"
      >
        <icon-refresh-outline class="w-4 h-4"></icon-refresh-outline>
      </button>
    </div>
  </div>
  <ModalDialog :show="showInfo" @close="showInfo = false">
    <div class="text-gray-100">
      <h3 class="font-bold text-xl">Rules</h3>

      <p class="mt-2">
        Your goal is to fill the board with the same color within 25 floods. Click on a color to flood all adjacent
        tiles from the starting position (<icon-arrow-circle-down-outline
          class="w-4 h-4 inline-block transform -rotate-45"
        ></icon-arrow-circle-down-outline
        >) with that color
      </p>

      <h2 class="font-semibold text-lg mt-4">Powerups</h2>

      <p>If you fill a tile with an icon, a special ability will be granted on activation</p>

      <ul class="mt-4 space-y-4">
        <li class="flex space-x-4">
          <icon-heart-outline class="w-6 h-6"></icon-heart-outline> <span>Decrease floods by 1 </span>
        </li>
        <li class="flex space-x-4">
          <icon-arrow-circle-down-outline class="w-6 h-6"></icon-arrow-circle-down-outline
          ><span
            >Change the starting position (<icon-arrow-circle-down-outline
              class="w-4 h-4 inline-block transform -rotate-45"
            ></icon-arrow-circle-down-outline
            >) to any tile</span
          >
        </li>
        <li class="flex space-x-4">
          <icon-fire-outline class="w-6 h-6"></icon-fire-outline>
          <span>Gain the ability to flood the board from any tile for one round</span>
        </li>
      </ul>
    </div>
  </ModalDialog>
</template>

<script>
import IconRefreshOutline from './icons/IconRefreshOutline.vue';
import IconFireOutline from '../components/icons/IconFireOutline.vue';
import IconHeartOutline from '../components/icons/IconHeartOutline.vue';
import IconArrowCircleDownOutline from './icons/IconArrowCircleDownOutline.vue';
import IconInformationCircleOutline from './icons/IconInformationCircleOutline.vue';
import ModalDialog from './ModalDialog.vue';

import { ref } from 'vue';

export default {
  components: {
    IconRefreshOutline,
    IconFireOutline,
    IconHeartOutline,
    IconArrowCircleDownOutline,
    IconInformationCircleOutline,
    ModalDialog,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  emits: ['reset'],
  setup() {
    let showInfo = ref(true);

    return {
      showInfo,
    };
  },
};
</script>

<style></style>
