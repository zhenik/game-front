import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import router from './router/index';
import { store } from './store';
import ApiService from "./api/index";

Vue.config.productionTip = false;

let config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

ApiService.init();
firebase.initializeApp(config);
// todo: https://blog.logrocket.com/vue-firebase-authentication/
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // this.$store.dispatch('/profile', user)
//   } else {
//     this.$router.push('/signin');
//   }
// })

// firebase.onAuthStateChanged((u) => {
//   if (u == null) this.isLoggedIn = false;
//   else this.isLoggedIn = true;
// });

new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount("#app");
