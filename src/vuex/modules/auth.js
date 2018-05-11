import firebase from 'firebase'
import router from '../../router'

const state = {
  isLoggedIn: false,
  auth: {},
  error: ''
}

const mutations = {
  setLoginState: (state, payload) => {
    state.isLoggedIn = payload
  },
  setAuthState: (state, payload) => {
    state.auth = payload
  },
  setAuthError: (state, payload) => {
    state.error = payload
  }
}

const getters = {
  getAuthState: (state) => {
    return state.auth
  },
  getLoginState: (state) => {
    return state.isLoggedIn
  },
  getAuthError: state => state.error
}

const actions = {
  userSignUp: ({commit, dispatch}, payload) => {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        let newUser = {
          uid: user.uid,
          displayName: 'Your Name',
          imgUrl: '',
          eventsJoined: {},
          invites: []
        }
        firebase.database().ref('users').child(user.uid).set(newUser)
        commit('setAuthError', '')
        // commit('setLoginState', true)
        // commit('setAuthState', user)
        router.push('/home')
      })
      .catch((err) => {
        commit('setAuthError', err.message)
      })
  },
  userEmailSignIn: ({commit, dispatch}, payload) => {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        commit('setAuthError', '')
        // commit('setLoginState', true)
        // commit('setAuthState', user)
        router.push('/home')
      })
      .catch((err) => {
        commit('setAuthError', err.message)
      })
  },
  userSignOut: ({commit, dispatch}) => {
    firebase.auth().signOut()
      .then(() => {
        // dispatch('resetAuthState')
        router.push('/signin')
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  userUpdateProfile: ({commit}, payload) => {
    firebase.auth().currentUser.updateProfile({displayName: payload.name}).then(() => {
      console.log('Name updated')
    }).catch(err => console.log(err.message))
  },
  setAuthFromAuto: ({commit}, payload) => {
    commit('setLoginState', true)
    commit('setAuthState', payload)
  },
  resetAuthState: ({commit}) => {
    commit('setLoginState', false)
    commit('setAuthState', {})
  },
  clearAuthError ({commit}) {
    commit('setAuthError', '')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
