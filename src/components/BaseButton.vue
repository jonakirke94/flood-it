<template>
  <button
    class="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 outline-none focus:outline-none lg:h-16 lg:w-16 btn-shadow rounded-md"
  >
    <slot />
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.btn-shadow {
  box-shadow: 0 4px 15px 0 rgb(15, 23, 42);
}
</style>
