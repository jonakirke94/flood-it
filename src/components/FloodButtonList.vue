<template>
  <button class="h-12 w-12 mt-12 bg-blue-300" @click="$emit('fill-pressed', 'BLUE-300')">r</button>
  <button class="h-12 w-12 bg-blue-500" @click="$emit('fill-pressed', 'BLUE-500')">g</button>
  <button class="h-12 w-12 bg-blue-700" @click="$emit('fill-pressed', 'BLUE-700')">y</button>
  <button class="h-12 w-12 bg-indigo-300" @click="$emit('fill-pressed', 'INDIGO-300')">i</button>
  <button class="h-12 w-12 bg-indigo-500" @click="$emit('fill-pressed', 'INDIGO-500')">t</button>
  <button class="h-12 w-12 bg-indigo-700" @click="$emit('fill-pressed', 'INDIGO-700')">p</button>
</template>

<script>
import useKeydown from '../composables/use-keydown';

export default {
  emits: ['fill-pressed'],
  setup(_props, { emit }) {
    useKeydown([
      { key: 'r', fn: () => emit('fill-pressed', 'BLUE-300') },
      { key: 'g', fn: () => emit('fill-pressed', 'BLUE-500') },
      { key: 'y', fn: () => emit('fill-pressed', 'BLUE-700') },
      { key: 'i', fn: () => emit('fill-pressed', 'INDIGO-300') },
      { key: 't', fn: () => emit('fill-pressed', 'INDIGO-500') },
      { key: 'p', fn: () => emit('fill-pressed', 'INDIGO-700') },
    ]);
  },
};
</script>
