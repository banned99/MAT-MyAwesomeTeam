import firebase from 'firebase'
import router from '../../router'

const state = {
  currentEventToken: '',
  event: {
    name: '',
    createDate: '',
    owner: {
      uid: '',
      name: ''
    },
    date: {
      start: '',
      end: ''
    },
    desc: '',
    staffs: [],
    teams: {},
    requests: [],
    milestone: [],
    flow: {},
    chatHistory: [],
    voiceHistory: [],
    fileHistory: []
  },
  searchResult: {
    name: '',
    date: {
      start: '',
      end: ''
    },
    desc: '',
    owner: '',
    staffs: [],
    requests: []
  }
}

const getters = {
  getEventToken: state => state.currentEventToken,
  getEvent: state => state.event,
  getEventName: state => state.event.name,
  getEventOwner: state => state.event.owner,
  getEventCreateDate: state => state.event.createDate,
  getEventDesc: state => state.event.desc,
  getEventDate: state => state.event.date,
  getEventMilestone: state => state.event.milestone,
  getEventFlow: state => state.event.flow,
  getEventStaffs: state => state.event.staffs,
  getEventTeams: state => state.event.teams,
  getSearchResult: state => state.searchResult,
  getEventJoinRequests: state => state.event.requests,
  getPendingJoinRequests: state => !state.event.requests ? [] : state.event.requests.filter(element => element.response.status === 'pending')
}

const mutations = {
  setEventToken: (state, payload) => {
    state.currentEventToken = payload
  },
  setEvent: (state, payload) => {
    state.event = payload
  },
  setEventName: (state, payload) => {
    state.event.name = payload
  },
  setEventOwner: (state, payload) => {
    state.event.owner = payload
  },
  setEventCreateDate: (state, payload) => {
    state.event.createDate = payload
  },
  setEventDate: (state, payload) => {
    state.event.date = payload
  },
  setEventDesc: (state, payload) => {
    state.event.desc = payload
  },
  setEventMilestone: (state, payload) => {
    state.event.milestone = payload
  },
  setEventFlow: (state, payload) => {
    state.event.flow = payload
  },
  setEventStaffs: (state, payload) => {
    state.event.staffs = payload
  },
  addEventStaff: (state, payload) => {
    state.event.staffs.push(payload)
  },
  setEventTeams: (state, payload) => {
    state.event.teams = payload
  },
  addEventTeam: (state, payload) => {
    state.event.teams[payload.name] = payload.data
  },
  setSearchResult: (state, payload) => {
    state.searchResult = payload
  },
  setEventRequests: (state, payload) => {
    state.event.requests = payload
  },
  addJoinRequest: (state, payload) => {
    state.searchResult.requests.push(payload)
  },
  respondJoinRequest: (state, payload) => {
    state.event.requests[payload.index].response = payload.response
  }
}

const templates = {
  staffMemberTemplate: {
    uid: '',
    priority: false,
    displayName: '',
    joinBy: '',
    acceptBy: '',
    team: {
      name: '',
      role: ''
    }
  },
  teamMemberTemplate: {
    user: {
      uid: '',
      name: ''
    },
    role: ''
  },
  teamTemplate: {
    name: '',
    data: {
      desc: '',
      members: []
    }
  },
  requestToJoinTemplate: {
    requester: {
      uid: '',
      name: '',
      timestamp: ''
    },
    response: {
      by: '',
      status: 'pending',
      timestamp: ''
    }
  }
}

const actions = {
  createNewEvent: ({commit, dispatch}, payload) => {
    commit('setEventToken', payload.token)
    commit('setEvent', payload.event)
    templates.staffMemberTemplate = {
      uid: payload.event.owner.uid,
      displayName: payload.event.owner.name,
      priority: true,
      joinBy: 'create',
      acceptBy: 'create',
      team: {
        name: 'event heads',
        role: 'head'
      }
    }
    templates.teamTemplate.name = 'event heads'
    templates.teamTemplate.data.desc = 'Event Head Team'
    templates.teamMemberTemplate.user = payload.event.owner
    templates.teamMemberTemplate.role = 'head'
    templates.teamTemplate.data.members.push(templates.teamMemberTemplate)
    commit('addEventStaff', templates.staffMemberTemplate)
    commit('addEventTeam', templates.teamTemplate)
    firebase.database().ref('events').child(payload.token).set(state.event)
      .then(() => {
        console.log('Event Created')
        router.push('/event/' + payload.token)
      })
      .catch(err => console.log(err.message))
  },
  pullEventData: ({commit}, payload) => {
    firebase.database().ref('events').child(payload).once('value', (snapshot) => {
      let data = snapshot.val()
      commit('setEventToken', payload)
      Object.keys(data).forEach(element => {
        commit('setEvent' + element[0].toUpperCase() + element.slice(1), data[element])
      })
    })
  },
  deleteEvent ({commit, dispatch}, payload) {
    firebase.database().ref('events').child(payload.eventId).remove()
      .then(() => {
        console.log('Delete from events done!')
        let staffsInEvent = state.event.staffs
        for (const key in staffsInEvent) {
          if (staffsInEvent.hasOwnProperty(key)) {
            console.log(staffsInEvent[key].uid)
            firebase.database().ref('users')
              .child(staffsInEvent[key].uid)
              .child('eventsJoined')
              .child(payload.eventId)
              .remove()
              .then(() => {
                console.log('User Joined Events deleted!')
                dispatch('resetEventData')
                router.replace('/home')
              })
              .catch(err => console.log(err.message))
          }
        }
      }).catch(err => {
        console.log(err.message)
      })
  },
  updateEvent ({commit, state}, payload) {
    firebase.database().ref('events/' + payload.eventId).update({
      name: payload.event.name,
      desc: payload.event.desc,
      date: payload.event.date
    }).then(() => {
      console.log('Event updated')
      let staffsInEvent = state.event.staffs
      for (const key in staffsInEvent) {
        if (staffsInEvent.hasOwnProperty(key)) {
          console.log(staffsInEvent[key].uid)
          firebase.database().ref('users').child(staffsInEvent[key].uid).child('eventsJoined').child(payload.eventId).update({
            name: payload.event.name,
            date: payload.event.date
          }).then(() => console.log('User Joined Events updated!'))
        }
      }
      for (let key in payload.event) {
        if (payload.event.hasOwnProperty(key)) {
          commit('setEvent' + key[0].toUpperCase() + key.slice(1), payload.event[key])
        }
      }
    }).catch(err => {
      console.log(err.message)
    })
  },
  resetEventData ({commit}) {
    console.log('reset event')
    commit('setEvent',
      {
        name: '',
        createDate: '',
        owner: {
          uid: '',
          name: ''
        },
        date: {
          start: '',
          end: ''
        },
        desc: '',
        staffs: [],
        teams: {},
        milestone: [],
        flow: {},
        chatHistory: [],
        voiceHistory: [],
        fileHistory: [],
        requests: []
      }
    )
    commit('setEventToken', '')
  },
  searchEventByToken ({commit}, payload) {
    firebase.database().ref('events').child(payload).once('value', (snapshot) => {
      let data = snapshot.val()
      if (data) {
        console.log('data not null')
        commit('setSearchResult', {
          name: data.name,
          date: data.date,
          desc: data.desc,
          owner: data.owner,
          staffs: data.staffs,
          requests: !data.requests ? [] : data.requests
        })
      } else {
        console.log('Null')
        commit('setSearchResult', null)
      }
    })
  },
  resetSearch ({commit}) {
    commit('setSearchResult', {
      name: '',
      date: {
        start: '',
        end: ''
      },
      desc: '',
      owner: '',
      staffs: [],
      requests: []
    })
  },
  requestToJoinEvent ({commit}, payload) {
    templates.requestToJoinTemplate.requester.uid = payload.user.uid
    templates.requestToJoinTemplate.requester.name = payload.user.name
    templates.requestToJoinTemplate.requester.timestamp = new Date().toLocaleString()
    console.log(templates.requestToJoinTemplate)
    firebase.database().ref('events')
      .child(payload.token)
      .child('requests')
      .child(state.searchResult.requests.length)
      .set(templates.requestToJoinTemplate)
      .then(() => {
        console.log('current index: ' + state.searchResult.requests.length)
        console.log('Join Request added!')
        commit('addJoinRequest', templates.requestToJoinTemplate)
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  acceptToJoinRequest ({commit}, payload) {
    console.log(payload)
    templates.staffMemberTemplate.acceptBy = payload.response.by
    templates.staffMemberTemplate.displayName = payload.request.requester.name
    templates.staffMemberTemplate.joinBy = 'Search by token'
    templates.staffMemberTemplate.priority = false
    templates.staffMemberTemplate.team = {
      name: 'unassigned',
      role: 'member'
    }
    templates.staffMemberTemplate.uid = payload.request.requester.uid
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('requests')
      .child(payload.index)
      .child('response')
      .set(payload.response)
      .then(() => {
        console.log('accepted')
        commit('respondJoinRequest', {index: payload.index, response: payload.response})
      }).catch(err => console.log(err.message))
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('staffs')
      .child(state.event.staffs.length)
      .set(templates.staffMemberTemplate)
      .then(() => {
        console.log('added to staff members')
        commit('addEventStaff', templates.staffMemberTemplate)
      }).catch(err => console.log(err.message))
  },
  declineToJoinRequest ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('requests')
      .child(payload.index)
      .child('response')
      .set(payload.response)
      .then(() => {
        console.log('declined')
        commit('respondJoinRequest', {index: payload.index, response: payload.response})
      }).catch(err => console.log(err.message))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
