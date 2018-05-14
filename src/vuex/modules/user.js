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
  },
  changeTeam: (state, payload) => {
    state.user.eventsJoined[payload.eventId].team = {name: payload.team, role: payload.role}
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
    let obj = state.user.eventsJoined ? state.user.eventsJoined : {}
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

    firebase.database().ref('users').child(state.user.uid).on('child_changed', snapshot => {
      // console.log('set' + snapshot.key[0].toUpperCase() + snapshot.key.slice(1), snapshot.val())
      commit('set' + snapshot.key[0].toUpperCase() + snapshot.key.slice(1), snapshot.val())
    })
  },
  updateDisplayName: ({commit}, payload) => {
    firebase.database().ref('users').child(state.user.uid).child('displayName').set(payload.name)
      .then(() => {
        commit('setDisplayName', payload.name)
        let joined = state.user.eventsJoined
        Object.keys(joined).forEach((eventId) => {
          let dbRef = firebase.database().ref('events').child(eventId)
          dbRef.once('value', (snapshot) => {
            let event = snapshot.val()
            if (event.owner.uid === state.user.uid) {
              dbRef.child('owner')
                .update({name: payload.name})
            }

            let staffPos = event.staffs.indexOf(event.staffs.find(value => value.uid === state.user.uid))
            dbRef.child('staffs')
              .child(staffPos)
              .update({displayName: payload.name})

            let anEvent = event.teams[joined[eventId].team.name].members
            let teamMemberPos = anEvent.indexOf(anEvent.find(value => value.user.uid === state.user.uid))
            dbRef.child('teams')
              .child(joined[eventId].team.name)
              .child('members').child(teamMemberPos)
              .child('user')
              .update({name: payload.name})

            event.chatHistory ? event.chatHistory.filter(value => value.uid === state.user.uid).forEach(element => {
              dbRef.child('chatHistory').child(event.chatHistory.indexOf(element)).update({name: payload.name})
            }) : console.log('no History')
          })
        })
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
  },
  updateJoinedEventTeam: ({commit}, payload) => {
    console.log(payload)
    Object.values(payload.members).forEach((member) => {
      firebase.database().ref('users')
        .child(member.user.uid)
        .child('eventsJoined')
        .child(payload.eventId)
        .child('team')
        .update({
          name: payload.teamName,
          role: payload.role ? payload.role : member.role
        }).then(() => {
          commit('changeTeam', {team: payload.teamName, role: payload.role ? payload.role : member.role, eventId: payload.eventId})
        })
    })
  },
  updateTeam: ({commit}, payload) => {
    firebase.database().ref('users')
      .child(payload.uid)
      .child('eventsJoined')
      .child(payload.eventId)
      .child('team')
      .update({
        name: payload.team,
        role: payload.role
      }).then(() => {
        commit('changeTeam', {team: payload.team, role: payload.role, eventId: payload.eventId})
      })
  },
  leaveEvent ({commit}, payload) {
    firebase.database().ref('users')
      .child(payload.uid)
      .child('eventsJoined')
      .child(payload.eventId)
      .remove().then(() => {
        commit('removeEventsJoined', {token: payload.eventId})
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
