<template>
  <h1 class="text-red-500">{{ msg }}</h1>

  <div>
    <p>Test</p>
    <p>dd</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
    },
  },

  setup() {
    const test = () => {
      const test = 2;

      console.log('test');
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
