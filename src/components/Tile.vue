<template>
  <div
    :id="tile.id"
    class="flex flex-wrap relative flex-shrink-0 text-white justify-center items-center text-xs"
    :class="[backgroundClass, { [animationClass]: tile.animated }]"
    :style="animationDelayStyle"
    @animationend="removeAnimation(tile)"
    @click="tileClicked"
  >
    <icon-rss-outline
      v-if="tile.id === startTileId"
      class="w-3 h-3 transform rotate-90 absolute left-1 top-1"
    ></icon-rss-outline>

    <template v-if="!hasTurnedThePowerUp">
      <icon-fire-outline v-if="tile?.powerUp?.name === 'fire'" class="w-4 h-4"></icon-fire-outline>
      <icon-heart-outline v-else-if="tile?.powerUp?.name === 'health'" class="w-4 h-4"></icon-heart-outline>
      <icon-flag-outline v-else-if="tile?.powerUp?.name === 'flag'" class="w-4 h-4"></icon-flag-outline>
    </template>
  </div>
</template>

<script>
import IconFireOutline from '../components/icons/IconFireOutline.vue';
import IconHeartOutline from '../components/icons/IconHeartOutline.vue';
import IconFlagOutline from './icons/IconFlagOutline.vue';
import IconRssOutline from './icons/IconRssOutline.vue';

import { inject, computed, watch, ref } from 'vue';

import useGameState from '../composables/use-game-state';
import useOptions from '../composables/use-options';
import usePowerUps from '../composables/use-power-ups';

export default {
  components: {
    IconFireOutline,
    IconHeartOutline,
    IconFlagOutline,
    IconRssOutline,
  },
  props: {
    tile: {
      type: Object,
      required: true,
    },
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    powerUp: {
      type: [Object, String],
      default: () => null,
    },
  },
  setup(props) {
    const { activeTileId, removeAnimation } = useGameState();
    const { colors, animations } = useOptions();

    const { turnedPowerUps } = usePowerUps();

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
        // return colors.get(oldColor.value);
        return 'bg-gray-700';
      }

      return colors.get(newColor.value);
    });

    const animationClass = computed(() => animations.get(props.tile.colorKey));

    const hasTurnedThePowerUp = computed(() => turnedPowerUps.map((x) => x.id).includes(props.tile.powerUp?.id));

    const animationDelayStyle = computed(() => {
      return {
        'animation-delay': `${props.tile.animationDelay}ms`,
        width: `${props.width}px`,
        height: `${props.height}px`,
      };
    });

    return {
      startTileId,
      tileClicked,
      backgroundClass,
      animationClass,
      removeAnimation,
      turnedPowerUps,
      animationDelayStyle,
      hasTurnedThePowerUp,
    };
  },
};
</script>

<style></style>
