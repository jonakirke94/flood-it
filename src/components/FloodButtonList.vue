<template>
  <span class="relative flex justify-center items-center h-32">
    <span
      v-if="disabled && msg"
      class="absolute px-4 py-2.5 bg-white text-gray-700 rounded-md w-96 z-10 text-xl font-semibold"
      >{{ msg }}</span
    >
    <div class="space-x-4" :class="{ 'filter blur-sm pointer-events-none': disabled }">
      <base-button class="bg-green-500" @click="$emit('fill-pressed', 'GREEN')">
        <span class="hidden md:block">q</span>
      </base-button>
      <base-button class="bg-red-500" @click="$emit('fill-pressed', 'RED')">
        <span class="hidden md:block">w</span></base-button
      >
      <base-button class="bg-yellow-500" @click="$emit('fill-pressed', 'YELLOW')">
        <span class="hidden md:block">e</span></base-button
      >
      <base-button class="bg-pink-400" @click="$emit('fill-pressed', 'PINK')">
        <span class="hidden md:block">r</span></base-button
      >
      <base-button class="bg-indigo-500" @click="$emit('fill-pressed', 'INDIGO')">
        <span class="hidden md:block">t</span></base-button
      >
      <base-button class="bg-purple-900" @click="$emit('fill-pressed', 'PURPLE')">
        <span class="hidden md:block">t</span></base-button
      >
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
      { key: 'r', fn: () => emit('fill-pressed', 'PINK') },
      { key: 't', fn: () => emit('fill-pressed', 'INDIGO') },
      { key: 'y', fn: () => emit('fill-pressed', 'PURPLE') },
    ]);
  },
};
</script>
