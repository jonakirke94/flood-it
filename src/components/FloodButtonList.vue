<template>
  <div>
    <button class="h-12 w-12 mt-12 bg-red-500" @click="$emit('fill-pressed', 'RED')">r</button>
    <button class="h-12 w-12 bg-green-500" @click="$emit('fill-pressed', 'GREEN')">g</button>
    <button class="h-12 w-12 bg-yellow-500" @click="$emit('fill-pressed', 'YELLOW')">y</button>
    <button class="h-12 w-12 bg-indigo-500" @click="$emit('fill-pressed', 'INDIGO')">i</button>
    <button class="h-12 w-12 bg-teal-500" @click="$emit('fill-pressed', 'TEAL')">t</button>
    <button class="h-12 w-12 bg-pink-500" @click="$emit('fill-pressed', 'PINK')">p</button>
  </div>
</template>

<script>
import useKeydown from '../composables/use-keydown';

export default {
  emits: ['fill-pressed'],
  setup(_props, { emit }) {
    useKeydown([
      { key: 'r', fn: () => emit('fill-pressed', 'RED') },
      { key: 'g', fn: () => emit('fill-pressed', 'GREEN') },
      { key: 'y', fn: () => emit('fill-pressed', 'YELLOW') },
      { key: 'i', fn: () => emit('fill-pressed', 'INDIGO') },
      { key: 't', fn: () => emit('fill-pressed', 'TEAL') },
      { key: 'p', fn: () => emit('fill-pressed', 'PINK') },
    ]);
  },
};
</script>
