import firebase from 'firebase'

const state = {
  user: {
    uid: '',
    displayName: '',
    imgUrl: '',
    eventsJoined: {},
    invites: []
  }
}

const mutations = {
  setUser: (state, payload) => {
    state.user = payload
  },
  setUserUID: (state, payload) => {
    state.user.uid = payload
  },
  setDisplayName: (state, payload) => {
    state.user.displayName = payload
  },
  setImgUrl: (state, payload) => {
    state.user.imgUrl = payload
  },
  setEventsJoined: (state, payload) => {
    state.user.eventsJoined = payload
  },
  addEventsJoined: (state, payload) => {
    state.user.eventsJoined[payload.token] = payload.data
  },
  removeEventsJoined: (state, payload) => {
    delete state.user.eventsJoined[payload.token]
  },
  setInvites: (state, payload) => {
    state.user.invites = payload
  },
  addInvites: (state, payload) => {
    state.user.invites = payload
  }
}

const getters = {
  getUserUID: (state) => {
    return state.user.uid
  },
  getDisplayName: (state) => {
    return state.user.displayName
  },
  getImgURL: (state) => {
    return state.user.imgUrl
  },
  getEventsJoined: (state) => {
    return !state.user.eventsJoined ? [] : state.user.eventsJoined
  },
  getInvites: (state) => {
    return state.user.invites
  },
  getActiveEvents: (state) => {
    let obj = state.user.eventsJoined
    let arr = Object.keys(obj).filter((k) => new Date().getTime() < new Date(obj[k].date.end).getTime())
    let active = {}
    arr.forEach(element => {
      active[element] = obj[element]
    })
    return active
  }
}

const templates = {
  joinedEventTemplate: {
    name: '',
    date: {
      start: '',
      end: ''
    },
    team: {
      name: '',
      role: ''
    }
  }
}

const actions = {
  setUserFromAuto: ({commit}, payload) => {
    commit('setUserUID', payload.uid)
    commit('setDisplayName', payload.displayName)
  },
  resetUser: ({commit}, payload) => {
    commit('setUser', {
      uid: '',
      displayName: '',
      imgUrl: '',
      eventsJoined: {},
      invites: []
    })
  },
  pullUserData: ({commit, state}, payload) => {
    firebase.database().ref('users').child(state.user.uid).once('value', (snapshot) => {
      let data = snapshot.val()
      commit('setEventsJoined', data.eventsJoined)
      commit('setImgUrl', data.imgUrl)
      commit('setInvites', data.invites)
    })
  },
  updateDisplayName: ({commit}, payload) => {
    firebase.database().ref('users').child(state.user.uid).child('displayName').set(payload.name)
      .then(() => {
        commit('setDisplayName', payload.name)
      })
      .catch((err) => console.log(err.message))
  },
  addEventFromCreate: ({commit}, payload) => {
    templates.joinedEventTemplate.name = payload.event.name
    templates.joinedEventTemplate.date = payload.event.date
    templates.joinedEventTemplate.team.name = 'event heads'
    templates.joinedEventTemplate.team.role = 'head'
    firebase.database().ref('users')
      .child(state.user.uid)
      .child('eventsJoined')
      .child(payload.token)
      .set(templates.joinedEventTemplate)
      .then(() => {
        console.log('user details updated')
        commit('addEventsJoined', {token: payload.token, data: templates.joinedEventTemplate})
      })
      .catch(err => console.log(err.message))
  },
  deleteJoinedEvents: ({commit}, payload) => {
    firebase.database().ref('users')
      .child(state.user.uid)
      .child('eventsJoined')
      .child(payload.token)
      .remove()
      .then(() => {
        console.log('user event joined deleted')
        commit('removeEventsJoined', payload.token)
      })
      .catch(err => console.log(err.message))
  },
  addEventFromJoin: ({commit}, payload) => {
    templates.joinedEventTemplate.name = payload.event.name
    templates.joinedEventTemplate.date = payload.event.date
    templates.joinedEventTemplate.team = {
      name: 'unassigned',
      role: 'member'
    }
    firebase.database().ref('users')
      .child(payload.request.requester.uid)
      .child('eventsJoined')
      .child(payload.eventToken)
      .set(templates.joinedEventTemplate)
      .then(() => {
        console.log(payload.request.requester.name + '\'s joined events updated')
      }).catch(err => console.log(err.message))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
