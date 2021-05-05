<template>
  <div
    class="relative text-white tile flex justify-center items-center text-xs border-2 border-transparent"
    :class="[
      backgroundClass,
      { [animationClass]: tile.animated },
      { 'hover:border-black cursor-pointer': atTileSelectionState },
    ]"
    :style="animationDelayStyle"
    @animationend="removeAnimation(tile)"
    @click="tileClicked"
  >
    <icon-arrow-circle-down-outline
      v-if="tile.id === startTileId"
      class="w-4 h-4 absolute transform -rotate-45 top-0.5 left-0.5"
    ></icon-arrow-circle-down-outline>

    <template v-if="showPowerUpIcon">
      <icon-fire-outline v-if="tile?.powerUp?.name === 'fire'" class="w-4 h-4"></icon-fire-outline>
      <icon-heart-outline v-else-if="tile?.powerUp?.name === 'health'" class="w-4 h-4"></icon-heart-outline>

      <icon-arrow-circle-down-outline
        v-else-if="tile?.powerUp?.name === 'flag'"
        class="w-4 h-4"
      ></icon-arrow-circle-down-outline>
    </template>
  </div>
</template>

<script>
import IconFireOutline from '../components/icons/IconFireOutline.vue';
import IconHeartOutline from '../components/icons/IconHeartOutline.vue';
import IconArrowCircleDownOutline from './icons/IconArrowCircleDownOutline.vue';

import { COLORS, ANIMATIONS } from '../util/options';

import { computed } from 'vue';

import useGameState from '../composables/use-game-state';
import usePowerUps from '../composables/use-power-ups';

export default {
  components: {
    IconFireOutline,
    IconHeartOutline,
    IconArrowCircleDownOutline,
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
    const { activeTileId, removeAnimation, startTileId } = useGameState();
    const { executedPowerUps, turnedPowerUps, atTileSelectionState } = usePowerUps();

    const tileClicked = () => {
      activeTileId.value = props.tile.id;
    };

    const backgroundClass = computed(() => {
      if (props.tile.animated) {
        return COLORS.get(props.tile.oldColorKey);
      }

      return COLORS.get(props.tile.colorKey);
    });

    const animationClass = computed(() => ANIMATIONS.get(props.tile.colorKey));

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
      atTileSelectionState,
    };
  },
};
</script>
