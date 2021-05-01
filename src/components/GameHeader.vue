<template>
  <div class="flex justify-between items-center h-24">
    <h1 class="text-3xl font-extrabold text-gray-100 md:ml-0 ml-4">Floods {{ count }}/{{ max }}</h1>

    <button
      class="px-4 py-2 border focus:outline-none border-white bg-transparent rounded-md transition-colors hover:bg-white hover:text-gray-700 text-white font-semibold"
      @click="$emit('reset')"
    >
      NEW
    </button>
  </div>
</template>

<script>
export default {
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
};
</script>

<style></style>
