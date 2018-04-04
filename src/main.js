import Vue from 'vue'
import firebase from 'firebase'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import App from './App'
import router from './router'

Vue.use(Buefy)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyARF2YmP8WbVFr1NnkcfD3HBl1DiuHy2Vg',
  authDomain: 'test-blog-1337.firebaseapp.com',
  databaseURL: 'https://test-blog-1337.firebaseio.com',
  projectId: 'test-blog-1337',
  storageBucket: '',
  messagingSenderId: '750601648315',
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
