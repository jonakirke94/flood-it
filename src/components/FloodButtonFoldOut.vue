<template>
  <li class="absolute">
    <transition-group name="slide-left" tag="ul" class="flex flex-col space-y-4 bg-gray-800">
      <li v-for="color in COLORS.keys()" v-show="show" :key="color">
        <base-button
          :class="[COLORS.get(color), { 'border-2 border-white': activeColor === color }]"
          @click="$emit('pressed', color)"
        ></base-button>
      </li>

      <li v-show="show" key="close-fold-out" class="flex justify-center cursor-pointer" @click="$emit('close')">
        <icon-x-outline class="w-6 h-6 text-white"></icon-x-outline>
      </li>
    </transition-group>
  </li>
</template>

<script>
import BaseButton from './BaseButton.vue';
import IconXOutline from './icons/IconXOutline.vue';

import { COLORS } from '../util/options';

export default {
  components: {
    BaseButton,
    IconXOutline,
  },
  props: {
    show: {
      type: Boolean,
    },
    activeColor: {
      type: String,
      required: true,
    },
  },
  emits: ['pressed', 'close'],
  setup() {
    return {
      COLORS,
    };
  },
};
</script>

<style scoped>
.slide-left-enter-active {
  transition: all 0.5s;
  animation: stagger 0.5s;
}
.slide-left-leave-active {
  transition: all 0.5s;
  animation: stagger 0.5s reverse;
}

.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}

@keyframes stagger {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
