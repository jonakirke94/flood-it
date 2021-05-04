<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="showModal" ref="modal-backdrop" class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div class="flex items-start justify-center min-h-screen pt-24 text-center">
          <transition
            enter-active-class="transition ease-out duration-300 transform "
            enter-from-class="opacity-0 translate-y-10 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
          >
            <div
              v-show="showModal"
              ref="modal"
              class="relative bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl p-8 w-full max-w-screen-md"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <button
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                @click.stop="$emit('close')"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <slot></slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, watch } from 'vue';
import useClickOutside from '../composables/use-click-outside';

export default {
  name: 'ModalDialog',
  props: {
    show: {
      type: Boolean,
      defeault: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const showModal = ref(true);
    const modal = ref(null);
    const { onClickOutside } = useClickOutside();

    onClickOutside(modal, () => {
      if (showModal.value === true) {
        emit('close');
      }
    });
    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );
    return {
      showModal,
      modal,
    };
  },
};
</script>

<style></style>
