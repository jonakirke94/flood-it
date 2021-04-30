<template>
  <ul class="flex flex-col mb-auto items-center w-16 md:w-32 mt-24 rounded-md relative">
    <template v-if="!hasWon">
      <li v-for="(powerUp, index) in powerUps.values()" :key="index" class="mb-4">
        <base-button
          class="bg-gray-700 text-white flex justify-center items-center"
          :class="{ 'border-2 border-white': activePowerUpId === powerUp.id }"
          @click="executePowerUp(powerUp)"
        >
          <icon-fire-outline v-if="powerUp.name === 'fire'" class="w-6 h-6"></icon-fire-outline>
          <icon-heart-outline v-else-if="powerUp.name === 'health'" class="w-6 h-6"></icon-heart-outline>
          <icon-cloud-rain-outline v-else-if="powerUp.name === 'flag'" class="w-6 h-6"></icon-cloud-rain-outline>
        </base-button>
      </li>

      <flood-button-fold-out
        :show="showColorButtons"
        :active-color="activeFireColor"
        @pressed="setActiveColor"
      ></flood-button-fold-out>
    </template>
  </ul>
</template>

<script>
import FloodButtonFoldOut from '../components/FloodButtonFoldOut.vue';

import BaseButton from '../components/BaseButton.vue';

import IconFireOutline from '../components/icons/IconFireOutline.vue';
import IconHeartOutline from '../components/icons/IconHeartOutline.vue';
import IconCloudRainOutline from './icons/IconCloudRainOutline.vue';

import useGameState from '../composables/use-game-state';
import usePowerUps from '../composables/use-power-ups';
import { watch, ref, inject } from 'vue';

export default {
  components: {
    IconFireOutline,
    IconHeartOutline,
    IconCloudRainOutline,
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
    const { clicks, activeTileId, startTileId, hasWon } = useGameState();
    const { removePowerUp, executedPowerUps, activePowerUpId, activePowerUp, activeFireColor } = usePowerUps();

    const callPlayRound = inject('callPlayRound');

    let showColorButtons = ref(false);

    watch(activeTileId, (newActiveTileId) => {
      if (newActiveTileId && activePowerUpId.value) {
        if (activePowerUp.value.name === 'fire') {
          executeFirePower(activePowerUp.value, newActiveTileId);
        } else if (activePowerUp.value.name === 'flag') {
          executeFlagPower(activePowerUp.value, newActiveTileId);
        }
      }
    });

    const executeHealthPower = (powerUp) => {
      clicks.value--;
      powerUpCleanUp(powerUp);
    };

    const executeFlagPower = (powerUp, newStartTileId) => {
      startTileId.value = newStartTileId;
      activePowerUpId.value = '';
      powerUpCleanUp(powerUp);
    };

    const executeFirePower = (powerUp, executeOnTileId) => {
      callPlayRound(activeFireColor.value, executeOnTileId);
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

    return { executePowerUp, showColorButtons, activeFireColor, activePowerUpId, hasWon };
  },
  methods: {
    setActiveColor(color) {
      this.activeFireColor = color;
    },
  },
};
</script>

<style></style>
