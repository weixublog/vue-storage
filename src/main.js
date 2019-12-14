import Vue from 'vue';
import storage from './storage';

Vue.config.productionTip = false;

new Vue({
  storage,
  render : (h) => h('div', 'Hello World!'),
}).$mount('#app');
