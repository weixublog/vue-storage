<template>
  <v-app class="ma-0">
    <v-container>
      <add-storage/>
    </v-container>
  </v-app>
</template>

<script>
import AddStorage from './src/example/AddStorage.vue';

export default {
  name       : 'app',
  components : {
    AddStorage,
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
