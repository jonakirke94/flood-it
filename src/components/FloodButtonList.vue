<template>
  <span class="relative flex justify-center items-center h-32">
    <span
      v-if="disabled && msg"
      class="absolute px-4 py-2.5 bg-white text-gray-700 rounded-md w-96 z-10 text-xl font-semibold"
      >{{ msg }}</span
    >
    <div class="space-x-4" :class="{ 'filter blur-sm pointer-events-none': disabled }">
      <base-button class="bg-green-500" @click="$emit('fill-pressed', 'GREEN')">q</base-button>
      <base-button class="bg-red-500" @click="$emit('fill-pressed', 'RED')">w</base-button>
      <base-button class="bg-yellow-500" @click="$emit('fill-pressed', 'YELLOW')">e</base-button>
      <base-button class="bg-teal-500" @click="$emit('fill-pressed', 'TEAL')">r</base-button>
      <base-button class="bg-indigo-500" @click="$emit('fill-pressed', 'INDIGO')">t</base-button>
      <base-button class="bg-purple-900" @click="$emit('fill-pressed', 'PURPLE')">y</base-button>
    </div>
  </span>
</template>

<script>
import useKeydown from '../composables/use-keydown';

import BaseButton from './BaseButton.vue';

export default {
  components: {
    BaseButton,
  },
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  emits: ['fill-pressed'],
  setup(_props, { emit }) {
    useKeydown([
      { key: 'q', fn: () => emit('fill-pressed', 'GREEN') },
      { key: 'w', fn: () => emit('fill-pressed', 'RED') },
      { key: 'e', fn: () => emit('fill-pressed', 'YELLOW') },
      { key: 'r', fn: () => emit('fill-pressed', 'TEAL') },
      { key: 't', fn: () => emit('fill-pressed', 'INDIGO') },
      { key: 'y', fn: () => emit('fill-pressed', 'PURPLE') },
    ]);
  },
};
</script>
