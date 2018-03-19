import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const state = {
  appName: 'MAT',
  error: null,
  loading: false
}

const getters = {
  getAppName: (state, getters) => {
    return state.appName
  },
  getError: (state, getters) => {
    return state.error
  },
  getLoading: (state, getters) => {
    return state.loading
  }
}

const mutations = {
  setError: (state, payload) => {
    state.error = payload
  },
  setLoading: (state, payload) => {
    state.loading = payload
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  'modules': {
    ...modules
  }
})
