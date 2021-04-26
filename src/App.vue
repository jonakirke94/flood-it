<template>
  <div class="flex flex-col">
    <span>Floods {{ clicks }}/25</span>
    <span>Has won? {{ hasWon }}</span>
  </div>
  <div
    class="flex flex-wrap max-w-screen-md mx-auto transition-all duration-700"
    :style="`width:600px;transform: rotate(${rotated}deg)`"
  >
    <div
      v-for="(col, j) in board.flat()"
      :key="j"
      :class="col.color"
      :style="{
        height: `${600 / board.length}px`,
        width: `${600 / board.length}px`,
      }"
      class="flex flex-wrap flex-shrink-0 text-white justify-center items-center"
    >
      <span v-if="col.powerUp === 'bomb'">B</span>
      <span v-if="col.powerUp === 'rotate'">R</span>
    </div>
  </div>

  <button class="h-12 w-12 mt-12 bg-gray-500" @click="rotate">ROT</button>
  <button class="h-12 w-12 mt-12 bg-red-500" @click="floodFill('RED')">r</button>
  <button class="h-12 w-12 bg-green-500" @click="floodFill('GREEN')">g</button>
  <button class="h-12 w-12 bg-yellow-500" @click="floodFill('YELLOW')">y</button>
  <button class="h-12 w-12 bg-indigo-500" @click="floodFill('INDIGO')">i</button>
  <button class="h-12 w-12 bg-teal-500" @click="floodFill('TEAL')">t</button>
  <button class="h-12 w-12 bg-pink-500" @click="floodFill('PINK')">p</button>
</template>

<script>
import useGameState from './composables/use-game-state';

import useKeydown from './composables/use-keydown';

import { ref } from 'vue';

export default {
  setup() {
    const { generateBoard, board, floodFill, clicks, hasWon } = useGameState();

    let rotated = ref(0);
    generateBoard();

    useKeydown([
      { key: 'r', fn: () => floodFill('RED') },
      { key: 'g', fn: () => floodFill('GREEN') },
      { key: 'y', fn: () => floodFill('YELLOW') },
      { key: 'i', fn: () => floodFill('INDIGO') },
      { key: 't', fn: () => floodFill('TEAL') },
      { key: 'p', fn: () => floodFill('PINK') },
    ]);

    return {
      board,
      floodFill,
      clicks,
      rotated,
      hasWon,
    };
  },
  methods: {
    rotate() {
      this.rotated += 90;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
