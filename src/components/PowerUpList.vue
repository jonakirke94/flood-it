<template>
  <ul class="flex">
    {{
      startTileId
    }}
    <li v-for="(powerUp, index) in powerUps" :key="index">
      <button
        class="h-12 w-12 bg-black text-white flex justify-center items-center rounded-md"
        @click="executePowerUp(powerUp)"
      >
        <icon-fire-outline v-if="powerUp.name === 'fire'" class="w-6 h-6"></icon-fire-outline>
        <icon-heart-outline v-else-if="powerUp.name === 'health'" class="w-6 h-6"></icon-heart-outline>
        <icon-flag-outline v-else-if="powerUp.name === 'flag'" class="w-6 h-6"></icon-flag-outline>
      </button>
    </li>

    <flood-button-list v-if="showButtons" @fill-pressed="setActiveColor"></flood-button-list>
  </ul>
</template>

<script>
import FloodButtonList from '../components/FloodButtonList.vue';

import IconFireOutline from '../components/icons/IconFireOutline.vue';
import IconHeartOutline from '../components/icons/IconHeartOutline.vue';
import IconFlagOutline from './icons/IconFlagOutline.vue';

import useGameState from '../composables/use-game-state';
import usePowerUps from '../composables/use-power-ups';
import { watch, ref, inject } from 'vue';

export default {
  components: {
    IconFireOutline,
    IconHeartOutline,
    IconFlagOutline,
    FloodButtonList,
  },
  props: {
    powerUps: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { clicks, activeTileId, startTileId } = useGameState();
    const { removePowerUp } = usePowerUps();

    const callPlayRound = inject('callPlayRound');

    let activePowerUp = '';
    let activeFireColor = ref('');

    let showButtons = ref(false);

    watch(activeTileId, (activeTileId) => {
      if (activeTileId && activePowerUp) {
        if (activePowerUp.name === 'fire') {
          executeFirePower(activePowerUp);
        }

        if (activePowerUp.name === 'flag') {
          executeFlagPower(activePowerUp, activeTileId);
        }
      }
    });

    const executeHealthPower = (powerUp) => {
      clicks.value--;
      removePowerUp(powerUp);
    };

    const executeFlagPower = (powerUp) => {
      startTileId.value = activeTileId.value;
      activePowerUp = '';
      activeTileId.value = '';
      removePowerUp(powerUp);
    };

    const executeFirePower = (powerUp) => {
      callPlayRound(activeFireColor.value, activeTileId.value);
      activePowerUp = '';
      activeFireColor.value = '';
      activeTileId.value = '';
      removePowerUp(powerUp);
    };

    const executePowerUp = (powerUp) => {
      if (powerUp.type === 'INSTANT') {
        if (powerUp.name === 'health') {
          executeHealthPower(powerUp);
        }
      }

      if (powerUp.type === 'ASYNC') {
        if (powerUp.name === 'flag') {
          activePowerUp = powerUp;
        }

        if (powerUp.name === 'fire') {
          activePowerUp = powerUp;
          showButtons.value = true;
        }
      }
    };

    return { executePowerUp, startTileId, showButtons, activeFireColor };
  },
  methods: {
    setActiveColor(color) {
      this.activeFireColor = color;
    },
  },
};
</script>

<style></style>
