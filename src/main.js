// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.config.productionTip = false

Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  // Initialize Firebase
  created () {
    var config = {
      apiKey: 'AIzaSyAi0oV06-njKCAFrB_t_Q1b06qzFmH2XGI',
      authDomain: 'film-library-by-sava.firebaseapp.com',
      databaseURL: 'https://film-library-by-sava.firebaseio.com',
      projectId: 'film-library-by-sava',
      storageBucket: 'film-library-by-sava.appspot.com',
      messagingSenderId: '283848193269'
    }
    firebase.initializeApp(config)
  }
})
