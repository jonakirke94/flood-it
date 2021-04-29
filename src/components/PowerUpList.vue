<template>
  <ul class="flex flex-col mb-auto items-center w-16 md:w-32 mt-24 rounded-md relative">
    <li v-for="(powerUp, index) in powerUps.values()" :key="index" class="mb-4">
      <base-button class="bg-gray-700 text-white flex justify-center items-center" @click="executePowerUp(powerUp)">
        <icon-fire-outline v-if="powerUp.name === 'fire'" class="w-6 h-6"></icon-fire-outline>
        <icon-heart-outline v-else-if="powerUp.name === 'health'" class="w-6 h-6"></icon-heart-outline>
        <icon-flag-outline v-else-if="powerUp.name === 'flag'" class="w-6 h-6"></icon-flag-outline
      ></base-button>
    </li>

    <flood-button-fold-out :show="showColorButtons" @pressed="setActiveColor"></flood-button-fold-out>
  </ul>
</template>

<script>
import FloodButtonFoldOut from '../components/FloodButtonFoldOut.vue';

import BaseButton from '../components/BaseButton.vue';

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
    FloodButtonFoldOut,
    BaseButton,
  },
  props: {
    powerUps: {
      type: Map,
      default: () => new Map(),
    },
  },
  setup() {
    const { clicks, activeTileId, startTileId } = useGameState();
    const { removePowerUp, executedPowerUps, activePowerUpId, activePowerUp } = usePowerUps();

    const callPlayRound = inject('callPlayRound');

    let activeFireColor = ref('');

    let showColorButtons = ref(false);

    watch(activeTileId, (newActiveTileId) => {
      if (newActiveTileId && activePowerUpId.value) {
        debugger;
        if (activePowerUp.value.name === 'fire') {
          executeFirePower(activePowerUp.value, newActiveTileId);
        }

        if (activePowerUp.name === 'flag') {
          executeFlagPower(activePowerUp.value, newActiveTileId);
        }
      }
    });

    const executeHealthPower = (powerUp) => {
      clicks.value--;
      powerUpCleanUp(powerUp);
    };

    const executeFlagPower = (powerUp, newStartTileId) => {
      debugger;
      startTileId.value = newStartTileId;
      activePowerUpId.value = '';
      powerUpCleanUp(powerUp);
    };

    const executeFirePower = (powerUp, newStartTileId) => {
      callPlayRound(activeFireColor.value, newStartTileId);
      activeFireColor.value = '';
      activeTileId.value = '';
      showColorButtons.value = false;
      powerUpCleanUp(powerUp);
    };

    const powerUpCleanUp = (powerUp) => {
      executedPowerUps.add(powerUp.id);
      removePowerUp(powerUp);
      activePowerUpId.value = '';
    };

    const executePowerUp = (powerUp) => {
      if (powerUp.type === 'INSTANT') {
        if (powerUp.name === 'health') {
          executeHealthPower(powerUp);
        }
      }

      if (powerUp.type === 'ASYNC') {
        if (powerUp.name === 'flag') {
          activePowerUpId.value = powerUp.id;
        }

        if (powerUp.name === 'fire') {
          activePowerUpId.value = powerUp.id;
          showColorButtons.value = true;
        }
      }
    };

    return { executePowerUp, showColorButtons, activeFireColor };
  },
  methods: {
    setActiveColor(color) {
      this.activeFireColor = color;
    },
  },
};
</script>

<style></style>
