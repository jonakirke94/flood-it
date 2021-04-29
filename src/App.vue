<template>
  <div class="max-w-screen-md h-screen mx-auto">
    <div class="flex">
      <div class="flex flex-1 flex-col">
        <div class="flex justify-between items-center h-24">
          <h1 class="text-3xl font-extrabold text-gray-100 md:ml-0 ml-4">Floods {{ clicks }}/25</h1>
          <!--<span>Has won? {{ hasWon }}</span>-->
          <base-button class="bg-gray-900 text-gray-100 flex justify-center items-center" @click="newGame">
            <icon-refresh-outline class="w-5 h-5"></icon-refresh-outline>
          </base-button>
        </div>

        <tile-board :tiles="board"></tile-board>

        <flood-button-list :disabled="disabled" @fill-pressed="playRound($event)"></flood-button-list>
      </div>
      <power-up-list :power-ups="turnedPowerUps"></power-up-list>
    </div>
  </div>
</template>

<script>
import useGameState from './composables/use-game-state';
import useOptions from './composables/use-options';
import usePowerUps from './composables/use-power-ups';

import FloodButtonList from './components/FloodButtonList.vue';
import PowerUpList from './components/PowerUpList.vue';
import TileBoard from './components/TileBoard.vue';
import BaseButton from './components/BaseButton.vue';
import IconRefreshOutline from './components/icons/IconRefreshOutline.vue';

import { provide, computed } from 'vue';

export default {
  components: {
    FloodButtonList,
    PowerUpList,
    TileBoard,
    BaseButton,
    IconRefreshOutline,
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

    // define a proper api and inject a symbol instead

    provide('startTileId', startTileId);

    // we dont need to inject this because we dont use a callback anymore
    provide('callPlayRound', playRound);

    const disabled = computed(() => {
      return !!(hasWon.value || activePowerUpId.value);
    });

    return {
      board,
      newGame,
      playRound,
      clicks,
      hasWon,
      colors,
      turnedPowerUps,
      disabled,
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
