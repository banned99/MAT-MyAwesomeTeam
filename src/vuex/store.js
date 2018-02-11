import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../utils/firebase'
import router from '../router'

Vue.use(Vuex)

const state = {
  appName: 'My Awesome Team',
  user: null,
  error: null,
  loading: false
}

const getters = {
  getCurrentUser: (state, getters) => {
    return state.user
  },
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
  setUser: (state, payload) => {
    state.user = payload
  },
  setError: (state, payload) => {
    state.error = payload
  },
  setLoading: (state, payload) => {
    state.loading = payload
  }
}

const actions = {
  // Authorization
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        firebase.database().ref('users').child(user.uid).set(payload.user)

        user.updateProfile({
          displayName: payload.user.displayName
        }).then(() => {
          commit('setUser', user)
          commit('setLoading', false)
          router.replace('home')
        })
      })
      .catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
  },
  userEmailSignIn ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setUser', user)
        commit('setLoading', false)
        commit('setError', null)
        router.replace('home')
      })
      .catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
  },
  userSignOut ({commit}) {
    commit('setLoading', true)
    firebase.auth().signOut()
      .then(() => {
        commit('setUser', null)
        commit('setLoading', false)
        router.replace('login')
      })
      .catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
  },
  userUpdateProfile ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().updateProfile({
      displayName: payload.displayName,
      photoURL: payload.photoURL
    }).then(user => {
      commit('setUser', user)
      commit('setLoading', false)
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
    })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', payload)
  },
  // Event Management
  createNewEvent ({commit}, payload) {
    commit('setLoading', true)
    let event = {
      name: payload.event.name,
      date: payload.event.date,
      dept: {
        name: 'boss',
        role: 'head'
      }
    }
    let token = payload.event.token
    delete payload.event.token
    firebase.database().ref('users')
      .child(payload.user.uid)
      .child('eventsJoined/' + token)
      .set(event)
      .catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
    firebase.database().ref('events')
      .child(token)
      .set(payload.event)
      .then(() => {
        commit('setLoading', false)
        router.push('event/' + token)
      })
  },
  deleteEvent ({commit}, payload, getters) {
    commit('setLoading', true)
    firebase.database().ref('events').child(payload.eventId).remove()
      .then(() => {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/eventsJoined/' + payload.eventId).remove()
          .then(() => {
            commit('setLoading', false)
            router.push('/home')
          }).catch(err => {
            commit('setError', err.message)
            commit('setLoading', false)
          })
      }).catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
  },
  editEvent ({commit}, payload) {
    commit('setLoading', true)
    firebase.database().ref('events').child(payload.eventId).set({
      name: payload.name,
      desc: payload.desc,
      date: {
        start: payload.date.start,
        end: payload.date.end
      }
    }).then(() => {
      commit('setLoading', false)
      this.router.replace('event/' + payload.eventId)
    })
  }
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})
