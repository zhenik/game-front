import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import { config } from './firebase.js'
import router from './router/index'
import { store } from './store'

Vue.config.productionTip = false;

new Vue({
  // el: '#app',
  router,
  store,
  created () {
    firebase.initializeApp(config)
  },
  render: h => h(App)
}).$mount('#app');
