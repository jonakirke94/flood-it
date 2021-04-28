<template>
  <div>
    <div class="flex flex-col">
      <span>Floods {{ clicks }}/25</span>
      <span>Has won? {{ hasWon }}</span>

      List: {{ turnedPowerUps }}
    </div>
    <tile-board :tiles="board" @on-render="setRefs"></tile-board>

    <power-up-list :power-ups="turnedPowerUps"></power-up-list>

    <flood-button-list @fill-pressed="callPlayRound($event)"></flood-button-list>

    <button class="h-12 w-12 shadow border border-gray-900" @click="newGame">RESET</button>
  </div>
</template>

<script>
import useGameState from './composables/use-game-state';
import useOptions from './composables/use-options';
import useAnimations from './composables/use-animations';
import usePowerUps from './composables/use-power-ups';

import FloodButtonList from './components/FloodButtonList.vue';
import PowerUpList from './components/PowerUpList.vue';
import TileBoard from './components/TileBoard.vue';

export default {
  components: {
    FloodButtonList,
    PowerUpList,
    TileBoard,
  },
  setup() {
    const { instantiateGame, playRound, clicks, hasWon, board, reset } = useGameState();
    const { colors } = useOptions();
    const { animateList, addInitialColors } = useAnimations();
    const { turnedPowerUps, resetPowerUps } = usePowerUps();

    let itemRefs = new Map();

    const newGame = () => {
      reset();
      resetPowerUps();
      instantiateGame((tiles) => {
        addInitialColors(tiles, itemRefs);
      });
    };

    newGame();

    const callPlayRound = (color) => {
      playRound(color, (res) => {
        animateList(res, itemRefs);
      });
    };

    const setRefs = (refs) => {
      itemRefs = refs;
    };

    return {
      board,
      newGame,
      callPlayRound,
      clicks,
      hasWon,
      colors,
      turnedPowerUps,
      setRefs,
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
