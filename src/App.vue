<template>
  <div class="flex flex-col">
    <span>Floods {{ clicks }}/25</span>
    <span>Has won? {{ hasWon }}</span>
  </div>
  <div
    class="flex flex-wrap max-w-screen-md mx-auto transition-all duration-700"
    :style="`width:600px;transform: rotate(${rotated}deg)`"
  >
    <div
      v-for="(col, j) in board.flat()"
      :id="col.id"
      :key="j"
      :ref="setItemRef"
      :class="colors.get(col.colorKey)"
      :style="{
        height: `${600 / board.length}px`,
        width: `${600 / board.length}px`,
        fontsize: '8px',
      }"
      class="flex flex-wrap flex-shrink-0 text-white justify-center items-center text-xs"
    >
      <!--<span v-if="col.powerUp === 'bomb'">B</span>
      <span v-if="col.powerUp === 'rotate'">R</span>
      <span>{{ (col.x + col.y) * 100 }} </span>-->
      <!--<div class="flex flex-col">
        <span>y:{{ col.y }}</span>
      </div>-->
    </div>
  </div>

  <button class="h-12 w-12 mt-12 bg-gray-500" @click="rotate">ROT</button>
  <button class="h-12 w-12 mt-12 bg-red-500" @click="callPlayRound('RED')">r</button>
  <button class="h-12 w-12 bg-green-500" @click="callPlayRound('GREEN')">g</button>
  <button class="h-12 w-12 bg-yellow-500" @click="callPlayRound('YELLOW')">y</button>
  <button class="h-12 w-12 bg-indigo-500" @click="callPlayRound('INDIGO')">i</button>
  <button class="h-12 w-12 bg-teal-500" @click="callPlayRound('TEAL')">t</button>
  <button class="h-12 w-12 bg-pink-500" @click="callPlayRound('PINK')">p</button>
</template>

<script>
import useGameState from './composables/use-game-state';
import useOptions from './composables/use-options';
import useFloodIt from './composables/use-flood-it';
import useAnimations from './composables/use-animations';

import useKeydown from './composables/use-keydown';

import { ref, onBeforeUpdate } from 'vue';

export default {
  setup() {
    const { playRound, clicks, hasWon } = useGameState();
    const { generateBoard, board } = useFloodIt();
    const { colors } = useOptions();
    const { animateList } = useAnimations();

    let rotated = ref(0);
    generateBoard();

    let itemRefs = new Map();

    const setItemRef = (el) => {
      if (el) {
        itemRefs.set(el.id, el);
      }
    };

    useKeydown([
      { key: 'r', fn: () => callPlayRound('RED') },
      { key: 'g', fn: () => callPlayRound('GREEN') },
      { key: 'y', fn: () => callPlayRound('YELLOW') },
      { key: 'i', fn: () => callPlayRound('INDIGO') },
      { key: 't', fn: () => callPlayRound('TEAL') },
      { key: 'p', fn: () => callPlayRound('PINK') },
    ]);

    const callPlayRound = (color) => {
      playRound(color, (res) => {
        animateList(res, itemRefs);
      });
    };

    onBeforeUpdate(() => {
      itemRefs = new Map();
    });

    return {
      board,
      callPlayRound,
      clicks,
      rotated,
      hasWon,
      colors,
      setItemRef,
    };
  },

  methods: {
    rotate() {
      this.rotated += 90;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  @apply bg-gray-800 min-h-screen text-white;
}

:root {
  --animation-duration: 0.75s;
  --animation-easing: ease-in;
}

.box-red {
  animation: Box-fade-Red var(--animation-duration) var(--animation-easing);
}

@keyframes Box-fade-Red {
  0% {
    @apply bg-red-300;
  }
  50% {
    @apply bg-red-400;
  }
  100% {
    @apply bg-red-500;
  }
}

.box-green {
  animation: Box-fade-Green var(--animation-duration) var(--animation-easing);
}

@keyframes Box-fade-Green {
  0% {
    @apply bg-green-300;
  }
  50% {
    @apply bg-green-400;
  }
  100% {
    @apply bg-green-500;
  }
}

.box-yellow {
  animation: Box-fade-Yellow var(--animation-duration) var(--animation-easing);
}
@keyframes Box-fade-Yellow {
  0% {
    @apply bg-yellow-300;
  }
  50% {
    @apply bg-yellow-400;
  }
  100% {
    @apply bg-yellow-500;
  }
}

.box-teal {
  animation: Box-fade-Teal var(--animation-duration) var(--animation-easing);
}

@keyframes Box-fade-Teal {
  0% {
    @apply bg-teal-300;
  }
  50% {
    @apply bg-teal-400;
  }
  100% {
    @apply bg-teal-500;
  }
}

.box-indigo {
  animation: Box-fade-Indigo var(--animation-duration) var(--animation-easing);
}

@keyframes Box-fade-Indigo {
  0% {
    @apply bg-indigo-300;
  }
  50% {
    @apply bg-indigo-400;
  }
  100% {
    @apply bg-indigo-500;
  }
}

.box-pink {
  animation: Box-fade-Pink var(--animation-duration) var(--animation-easing);
}

@keyframes Box-fade-Pink {
  0% {
    @apply bg-pink-300;
  }
  50% {
    @apply bg-pink-400;
  }
  100% {
    @apply bg-pink-500;
  }
}
</style>
