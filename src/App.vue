<template>
  <div>
    <div class="flex flex-col">
      <span>Floods {{ clicks }}/25</span>
      <span>Has won? {{ hasWon }}</span>
    </div>
    <tile-board :tiles="board"></tile-board>

    <power-up-list :power-ups="turnedPowerUps"></power-up-list>

    <flood-button-list @fill-pressed="callPlayRound($event)"></flood-button-list>

    <button class="h-12 w-12 shadow border border-gray-900" @click="newGame">RESET</button>
  </div>
</template>

<script>
import useGameState from './composables/use-game-state';
import useOptions from './composables/use-options';
import usePowerUps from './composables/use-power-ups';

import FloodButtonList from './components/FloodButtonList.vue';
import PowerUpList from './components/PowerUpList.vue';
import TileBoard from './components/TileBoard.vue';

import { provide } from 'vue';

export default {
  components: {
    FloodButtonList,
    PowerUpList,
    TileBoard,
  },
  setup() {
    const { instantiateGame, playRound, clicks, hasWon, board, reset, startTileId } = useGameState();
    const { colors } = useOptions();
    const { turnedPowerUps, resetPowerUps, activePowerUpId } = usePowerUps();

    const newGame = () => {
      reset();
      resetPowerUps();
      instantiateGame();
    };

    newGame();

    const callPlayRound = (color, tileIdToFlood = null) => {
      playRound(color, tileIdToFlood);
    };

    provide('startTileId', startTileId);
    provide('activePowerUpId', activePowerUpId);

    // we dont need to inject this because we dont use a callback anymore
    provide('callPlayRound', callPlayRound);

    return {
      board,
      newGame,
      callPlayRound,
      clicks,
      hasWon,
      colors,
      turnedPowerUps,
    };
  },
};
</script>

<style>
@import './assets/animations.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  @apply bg-gray-800 min-h-screen text-white;
}
</style>
