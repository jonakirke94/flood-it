<template>
  <div class="max-w-screen-md h-screen mx-auto">
    <div class="flex">
      <div class="flex flex-1 flex-col">
        <game-header :count="floods" :max="MAX_FLOODS" @reset="newGame"></game-header>

        <tile-board :tiles="board"></tile-board>

        <flood-button-list
          :disabled="isDisabled"
          :msg="powerUpHelpText"
          @fill-pressed="playRound($event)"
        ></flood-button-list>
      </div>
      <power-up-list :power-ups="displayPowerUpList"></power-up-list>
    </div>
  </div>
</template>

<script>
import useGameState from './composables/use-game-state';
import usePowerUps from './composables/use-power-ups';

import FloodButtonList from './components/FloodButtonList.vue';
import PowerUpList from './components/PowerUpList.vue';
import TileBoard from './components/TileBoard.vue';
import GameHeader from './components/GameHeader.vue';

import { MAX_FLOODS } from './util/options';

import { computed } from 'vue';

export default {
  components: {
    FloodButtonList,
    PowerUpList,
    TileBoard,
    GameHeader,
  },
  setup() {
    const { newGame, playRound, floods, hasWon, board, powerUpHelpText, hasUsedMaxFloods } = useGameState();
    const { displayPowerUpList, resetPowerUps, activePowerUpId } = usePowerUps();

    newGame();

    const isDisabled = computed(() => {
      return !!(hasWon.value || activePowerUpId.value || hasUsedMaxFloods.value);
    });

    return {
      board,
      newGame,
      playRound,
      floods,
      hasWon,
      displayPowerUpList,
      isDisabled,
      powerUpHelpText,
      MAX_FLOODS,
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
