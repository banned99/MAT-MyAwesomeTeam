// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuefire from 'vuefire'
import store from './vuex/store'
import firebase from './utils/firebase'

Vue.config.productionTip = false
Vue.use(Vuefire)

/* eslint-disable no-new */
const unsubscibe = firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    created () {
      store.dispatch('autoSignIn', user)
    }
  })
  unsubscibe()
})
