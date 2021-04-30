<template>
  <div
    class="relative text-white flex h-full w-full justify-center items-center text-xs"
    :class="[backgroundClass, { [animationClass]: tile.animated }]"
    :style="animationDelayStyle"
    @animationend="removeAnimation(tile)"
    @click="tileClicked"
  >
    <icon-cloud-rain-outline
      v-if="tile.id === startTileId"
      class="w-3 h-3 absolute left-1 top-1"
    ></icon-cloud-rain-outline>

    <template v-if="showPowerUpIcon">
      <icon-fire-outline v-if="tile?.powerUp?.name === 'fire'" class="w-4 h-4"></icon-fire-outline>
      <icon-heart-outline v-else-if="tile?.powerUp?.name === 'health'" class="w-4 h-4"></icon-heart-outline>

      <icon-cloud-rain-outline v-else-if="tile?.powerUp?.name === 'flag'" class="w-4 h-4"></icon-cloud-rain-outline>
    </template>
  </div>
</template>

<script>
import IconFireOutline from '../components/icons/IconFireOutline.vue';
import IconHeartOutline from '../components/icons/IconHeartOutline.vue';
import IconCloudRainOutline from './icons/IconCloudRainOutline.vue';

import { inject, computed, watch, ref } from 'vue';

import useGameState from '../composables/use-game-state';
import useOptions from '../composables/use-options';
import usePowerUps from '../composables/use-power-ups';

export default {
  components: {
    IconFireOutline,
    IconHeartOutline,
    IconCloudRainOutline,
  },
  props: {
    tile: {
      type: Object,
      required: true,
    },
    powerUp: {
      type: [Object, String],
      default: () => null,
    },
  },
  setup(props) {
    const { activeTileId, removeAnimation } = useGameState();
    const { colors, animations } = useOptions();

    const { turnedPowerUps, executedPowerUps } = usePowerUps();

    const startTileId = inject('startTileId');

    const tileClicked = () => {
      activeTileId.value = props.tile.id;
    };

    const oldColor = ref(props.tile.colorKey);
    const newColor = ref(props.tile.colorKey);

    watch(
      () => props.tile.colorKey,
      (newTile, oldTile) => {
        newColor.value = newTile;
        oldColor.value = oldTile;
      }
    );

    const backgroundClass = computed(() => {
      if (props.tile.animated) {
        return colors.get(oldColor.value);
      }

      return colors.get(newColor.value);
    });

    const animationClass = computed(() => animations.get(props.tile.colorKey));

    const showPowerUpIcon = computed(() => {
      return !turnedPowerUps.has(props.tile.powerUp?.id) && !executedPowerUps.has(props.tile.powerUp?.id);
    });

    const animationDelayStyle = computed(() => {
      return {
        'animation-delay': `${props.tile.animationDelay}ms`,
      };
    });

    return {
      startTileId,
      tileClicked,
      backgroundClass,
      animationClass,
      removeAnimation,
      showPowerUpIcon,
      animationDelayStyle,
    };
  },
};
</script>

<style></style>
