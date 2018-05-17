// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import store from './vuex'
import firebase from 'firebase'
import { firebaseConfig } from './config'
import VModal from 'vue-js-modal'
import LightTimeline from 'vue-light-timeline'
import BootstrapVue from 'bootstrap-vue'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import VueModalTor from 'vue-modaltor'

Vue.use(VueModalTor)
Vue.use(VModal)
Vue.use(VueFire)
Vue.use(LightTimeline)
Vue.use(BootstrapVue)
Vue.use(VueTabs)
Vue.component('modal', {
  template: '#modal-template'
})

require('material-design-lite')

Vue.config.productionTip = false
Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
const unsubscibe = firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    created () {
      this.$firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.dispatch('setAuthFromAuto', user)
          store.dispatch('setUserFromAuto', user)
          this.$router.push('/home')
        } else {
          store.dispatch('resetAuthState')
          store.dispatch('resetUser')
          this.$router.push('/signin')
        }
      })
    }
  })
  unsubscibe()
})
