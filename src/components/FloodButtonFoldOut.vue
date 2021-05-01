<template>
  <transition-group name="slide-left" tag="ul" class="flex flex-col absolute space-y-4 bg-gray-800">
    <base-button
      v-for="color in COLORS.keys()"
      v-show="show"
      :key="color"
      :class="[COLORS.get(color), { 'border-2 border-white': activeColor === color }]"
      @click="$emit('pressed', color)"
    ></base-button>
  </transition-group>
</template>

<script>
import BaseButton from './BaseButton.vue';

import { COLORS } from '../util/options';

export default {
  components: {
    BaseButton,
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
  emits: ['pressed'],
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
