<template>
  <div class="flex justify-between items-center h-24">
    <h1 class="text-3xl font-extrabold text-gray-100 md:ml-0 ml-4">Floods {{ count }}/{{ max }}</h1>

    <button
      class="px-4 py-2 bg-gray-900 focus:outline-none bg-transparent text-sm rounded-md transition-colors hover:text-white"
      @click="showInfo = !showInfo"
    >
      <icon-information-circle-outline class="w-4 h-4"></icon-information-circle-outline>
    </button>

    <button
      class="px-4 py-2 bg-gray-900 focus:outline-none bg-transparent text-sm rounded-md transition-colors hover:text-white"
      @click="$emit('reset')"
    >
      <icon-refresh-outline class="w-4 h-4"></icon-refresh-outline>
    </button>
  </div>

  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto pointer-events-none"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="showInfo"
          key="overlay"
          class="fixed pointer-events-auto inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <transition
        enter-active-class="transition-all ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="showInfo"
          key="content"
          class="inline-block align-bottom pointer-events-auto bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          @click="showInfo = false"
        >
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <!-- Heroicon name: outline/check -->
              <svg
                class="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">Payment successful</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Go back to dashboard
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import IconRefreshOutline from './icons/IconRefreshOutline.vue';
import IconInformationCircleOutline from './icons/IconInformationCircleOutline.vue';

import { ref } from 'vue';

export default {
  components: {
    IconRefreshOutline,
    IconInformationCircleOutline,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  emits: ['reset'],
  setup() {
    let showInfo = ref(false);

    return {
      showInfo,
    };
  },
};
</script>

<style></style>
