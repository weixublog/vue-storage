<template>
  <div id="app">
    <test-storage/>
  </div>
</template>

<script>
import TestStorage from './src/example/TestStorage.vue';

export default {
  name       : 'app',
  components : {
    TestStorage,
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
