import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import storage from './src/storage';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  storage,
  render : (h) => h(App),
}).$mount('#app');
