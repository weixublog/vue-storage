import Vue from 'vue';
import App from './App.vue';
import storage from './src/storage';

Vue.config.productionTip = false;

new Vue({
  storage,
  render : (h) => h(App),
}).$mount('#app');
