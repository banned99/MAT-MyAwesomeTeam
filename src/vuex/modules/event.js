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
    staffs: {},
    teams: {},
    requests: [],
    milestone: {},
    flow: {},
    chatHistory: [],
    lastStaffIndex: 0
  },
  searchResult: {
    name: '',
    date: {
      start: '',
      end: ''
    },
    desc: '',
    owner: '',
    staffs: {},
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
  getEventPriorizedStaffs: state => Object.values(state.event.staffs).filter(element => element.priority === true),
  getEventTeams: state => state.event.teams ? state.event.teams : {},
  getSearchResult: state => state.searchResult,
  getEventJoinRequests: state => state.event.requests,
  getPendingJoinRequests: state => !state.event.requests ? [] : state.event.requests.filter(element => element.response.status === 'pending'),
  getChatHistory: state => state.event.chatHistory,
  getUnassignedStaffs: state => Object.values(state.event.staffs).filter((element) => element.team.name.toLowerCase() === 'unassigned'),
  getTeamNames: state => state.event.teams ? Object.keys(state.event.teams) : []
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
    state.event.staffs[payload.uid] = payload
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
  },
  setEventChatHistory: (state, payload) => {
    state.event.chatHistory = payload
  },
  addNewMessage: (state, payload) => {
    state.event.chatHistory.push(payload)
  },
  addMemberToTeam: (state, payload) => {
    state.event.teams[payload.team].members.splice(payload.index, 0, payload.member)
  },
  removeStaffFromTeam: (state, payload) => {
    state.event.teams[payload.team].members.splice(payload.index, 1)
  },
  updateStaffTeam: (state, payload) => {
    state.event.staffs[payload.index].team = {name: payload.name, role: payload.role}
  },
  deleteEventTeam: (state, payload) => {
    delete state.event.teams[payload]
  },
  setEventLastStaffIndex: (state, payload) => {
    state.event.lastStaffIndex = payload
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
      members: [],
      lastMemberIndex: 0
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
  },
  chatHistoryTemplate: {
    uid: '',
    name: '',
    timestamp: '',
    message: ''
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
        name: 'Event heads',
        role: 'Head'
      }
    }
    templates.teamTemplate.name = 'event heads'
    templates.teamTemplate.data.desc = 'Event Head Team'
    templates.teamMemberTemplate.user = payload.event.owner
    templates.teamMemberTemplate.role = 'Head'
    templates.teamTemplate.data.members[payload.event.owner.uid] = (templates.teamMemberTemplate)
    templates.teamTemplate.data.lastMemberIndex = 1
    commit('addEventStaff', templates.staffMemberTemplate)
    commit('addEventTeam', templates.teamTemplate)
    commit('setEventLastStaffIndex', 1)
    firebase.database().ref('events').child(payload.token).set(state.event)
      .then(() => {
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
    }).catch(err => console.log(err.message))

    firebase.database().ref('events').child(payload).on('child_changed', snapshot => {
      commit('setEvent' + snapshot.key[0].toUpperCase() + snapshot.key.slice(1), snapshot.val())
    })

    firebase.database().ref('events').child(payload).on('child_added', snapshot => {
      commit('setEvent' + snapshot.key[0].toUpperCase() + snapshot.key.slice(1), snapshot.val())
    })
  },
  deleteEvent ({commit, dispatch}, payload) {
    firebase.database().ref('events').child(payload.eventId).remove()
      .then(() => {
        let staffsInEvent = state.event.staffs
        for (const key in Object.keys(staffsInEvent)) {
          if (staffsInEvent.hasOwnProperty(key)) {
            firebase.database().ref('users')
              .child(staffsInEvent[key].uid)
              .child('eventsJoined')
              .child(payload.eventId)
              .remove()
              .then(() => {
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
      let staffsInEvent = state.event.staffs
      for (const key in staffsInEvent) {
        if (staffsInEvent.hasOwnProperty(key)) {
          firebase.database().ref('users').child(staffsInEvent[key].uid).child('eventsJoined').child(payload.eventId).update({
            name: payload.event.name,
            date: payload.event.date
          })
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
    firebase.database().ref('events').child(state.currentEventToken).off()
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
        commit('setSearchResult', {
          name: data.name,
          date: data.date,
          desc: data.desc,
          owner: data.owner,
          staffs: data.staffs,
          requests: !data.requests ? [] : data.requests
        })
      } else {
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
    firebase.database().ref('events')
      .child(payload.token)
      .child('requests')
      .child(state.searchResult.requests.length)
      .set(templates.requestToJoinTemplate)
      .then(() => {
        commit('addJoinRequest', templates.requestToJoinTemplate)
      })
      .catch(err => {
        console.log(err.message)
      })
  },
  acceptToJoinRequest ({commit}, payload) {
    templates.staffMemberTemplate.acceptBy = payload.response.by
    templates.staffMemberTemplate.displayName = payload.request.requester.name
    templates.staffMemberTemplate.joinBy = 'Search by token'
    templates.staffMemberTemplate.priority = false
    templates.staffMemberTemplate.team = {
      name: 'Unassigned',
      role: 'Member'
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
      .child(state.event.lastStaffIndex + 1)
      .set(templates.staffMemberTemplate)
      .then(() => {
        commit('addEventStaff', templates.staffMemberTemplate)
        commit('setEventLastStaffIndex', state.event.lastStaffIndex + 1)
      }).catch(err => console.log(err.message))
    firebase.database().ref('events').child(state.currentEventToken)
      .update({lastStaffIndex: state.event.lastStaffIndex})
  },
  declineToJoinRequest ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('requests')
      .child(payload.index)
      .child('response')
      .set(payload.response)
      .then(() => {
        commit('respondJoinRequest', {index: payload.index, response: payload.response})
      }).catch(err => console.log(err.message))
  },
  sendMessage ({commit}, payload) {
    templates.chatHistoryTemplate.uid = payload.uid
    templates.chatHistoryTemplate.name = payload.name
    templates.chatHistoryTemplate.timestamp = new Date().toLocaleString()
    templates.chatHistoryTemplate.message = payload.message
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('chatHistory')
      .child(state.event.chatHistory.length ? state.event.chatHistory.length : 0)
      .set(templates.chatHistoryTemplate)
      .then(() => {
        firebase.database().ref('events')
          .child(state.currentEventToken)
          .child('chatHistory').once('value', snapshot => {
            commit('setEventChatHistory', snapshot.val())
          })
      })
      .catch(err => console.log(err.message))
  },
  addTeam ({commit}, payload) {
    let staffValue = Object.values(state.event.staffs).find(user => {
      if (user) {
        return user.uid === payload.data.head
      }
    })
    let staffValueIndex = Object.values(state.event.staffs).indexOf(staffValue)
    let staffIndex = Object.keys(state.event.staffs)[staffValueIndex]

    templates.teamTemplate.name = payload.name.toLowerCase()
    templates.teamTemplate.data.desc = payload.data.desc

    templates.teamMemberTemplate.role = 'Head'
    templates.teamMemberTemplate.user.uid = staffValue.uid
    templates.teamMemberTemplate.user.name = staffValue.displayName
    templates.teamTemplate.data.members = []
    templates.teamTemplate.data.members.push(templates.teamMemberTemplate)
    templates.teamTemplate.data.lastMemberIndex = 1

    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('teams')
      .child(templates.teamTemplate.name)
      .set(templates.teamTemplate.data).then(() => {
        // commit('addEventTeam', templates.teamTemplate)
        firebase.database().ref('events')
          .child(state.currentEventToken)
          .child('teams')
          .once('value', snapshot => {
            commit('setEventTeams', snapshot.val())
          })
      })

    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('staffs')
      .child(staffIndex)
      .child('team')
      .update({name: payload.name, role: 'Head', priority: true}).then(() => {
        commit('updateStaffTeam', {name: payload.name.toLowerCase(), role: 'Head', index: staffIndex})
      }).catch(err => console.log(err))
  },
  editTeam ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('teams')
      .child(payload.data.newTeamName)
      .set({
        desc: payload.data.newTeamDesc,
        members: state.event.teams[payload.index].members ? state.event.teams[payload.index].members : []
      })
    Object.values(state.event.teams[payload.index].members).forEach(member => {
      let staffValue = Object.values(state.event.staffs).indexOf(Object.values(state.event.staffs).find(el => el.uid === member.user.uid))
      let staffIndex = Object.keys(state.event.staffs)[staffValue]
      firebase.database().ref('events')
        .child(state.currentEventToken)
        .child('staffs')
        .child(staffIndex)
        .child('team')
        .update({name: payload.data.newTeamName})
        .then(() => {
          commit('updateStaffTeam', {name: payload.data.newTeamName, role: member.role, index: staffIndex})
        })
    })
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('teams')
      .child(payload.index)
      .remove().then(() => {
        firebase.database().ref('events')
          .child(state.currentEventToken)
          .child('teams')
          .once('value', snapshot => {
            commit('setEventTeams', snapshot.val())
          })
      })
  },
  deleteTeam ({commit}, payload) {
    let membersValue = state.event.teams[payload].members ? Object.values(state.event.teams[payload].members) : []
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('teams')
      .child(payload).remove().then(() => {
        // commit('deleteEventTeam', payload)
        firebase.database().ref('events')
          .child(state.currentEventToken)
          .child('teams')
          .once('value', snapshot => {
            commit('setEventTeams', snapshot.val())
          })
      })
    membersValue.forEach((member) => {
      let staffValue = Object.values(state.event.staffs).indexOf(Object.values(state.event.staffs).find(el => el.uid === member.user.uid))
      let staffIndex = Object.keys(state.event.staffs)[staffValue]
      firebase.database().ref('events')
        .child(state.currentEventToken)
        .child('staffs')
        .child(staffIndex)
        .child('team')
        .update({
          name: 'Unassigned',
          role: 'Member'
        }).then(() => {
          commit('updateStaffTeam', {name: 'Unassigned', role: 'Member', index: staffIndex})
        })
    })
  },
  assignToTeam ({commit}, payload) {
    let staffValue = Object.values(state.event.staffs).find(user => {
      if (user) {
        return user.uid === payload.uid
      }
    })
    let staffValueIndex = Object.values(state.event.staffs).indexOf(staffValue)
    let staffIndex = Object.keys(state.event.staffs)[staffValueIndex]

    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('staffs')
      .child(staffIndex)
      .update({priority: payload.prio, team: {name: payload.team, role: payload.role}})
      .then(() => {
        commit('updateStaffTeam', {name: payload.team, role: payload.role, index: staffIndex})
      })

    templates.teamMemberTemplate.user.name = staffValue.displayName
    templates.teamMemberTemplate.user.uid = payload.uid
    templates.teamMemberTemplate.role = payload.role

    var teamIndex = -1
    var valueIndex
    if (payload.type === 'updateStaff') {
      let teamMember = Object.values(state.event.teams[payload.team].members).find(member => {
        if (member) {
          return member.user.uid === payload.uid
        }
      })
      valueIndex = Object.values(state.event.teams[payload.team].members).indexOf(teamMember)
      teamIndex = Object.keys(state.event.teams[payload.team].members)[valueIndex]
    } else {
      teamIndex = state.event.teams[payload.team].lastMemberIndex
    }

    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('teams')
      .child(payload.team)
      .child('members')
      .child(teamIndex)
      .set(templates.teamMemberTemplate)
      .then(() => {
        if (payload.type !== 'updateStaff') {
          firebase.database().ref('events')
            .child(state.currentEventToken)
            .child('teams')
            .child(payload.team)
            .update({lastMemberIndex: teamIndex + 1})
        }
      })
  },
  unassignFromTeam ({commit}, payload) {
    let staffValue = Object.values(state.event.staffs).find(user => {
      if (user) {
        return user.uid === payload.uid
      }
    })
    let staffValueIndex = Object.values(state.event.staffs).indexOf(staffValue)
    let staffIndex = Object.keys(state.event.staffs)[staffValueIndex]

    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('staffs')
      .child(staffIndex)
      .update({priority: 'false', team: {name: 'Unassigned', role: 'Member'}})

    var teamIndex = -1
    var valueIndex
    let teamMember = Object.values(state.event.teams[payload.team].members).find(member => {
      if (member) {
        return member.user.uid === payload.uid
      }
    })
    valueIndex = Object.values(state.event.teams[payload.team].members).indexOf(teamMember)
    teamIndex = Object.keys(state.event.teams[payload.team].members)[valueIndex]
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('teams')
      .child(payload.team)
      .child('members')
      .child(teamIndex)
      .remove()
  },
  kickStaff ({commit}, payload) {
    let staffValue = Object.values(state.event.staffs).find(user => {
      if (user) {
        return user.uid === payload.uid
      }
    })
    let staffValueIndex = Object.values(state.event.staffs).indexOf(staffValue)
    let staffIndex = Object.keys(state.event.staffs)[staffValueIndex]

    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('staffs')
      .child(staffIndex)
      .remove()

    if (payload.team.trim()) {
      var teamIndex = -1
      var valueIndex
      let teamMember = Object.values(state.event.teams[payload.team].members).find(member => {
        if (member) {
          return member.user.uid === payload.uid
        }
      })
      valueIndex = Object.values(state.event.teams[payload.team].members).indexOf(teamMember)
      teamIndex = Object.keys(state.event.teams[payload.team].members)[valueIndex]

      firebase.database().ref('events')
        .child(state.currentEventToken)
        .child('teams')
        .child(payload.team)
        .child('members')
        .child(teamIndex)
        .remove()
    }
  },
  addFlow ({commit}, payload) {
    firebase.database().ref('events').child(state.currentEventToken).child('flow').set(payload).then(() => {
      firebase.database().ref('events').child(state.currentEventToken).child('flow').once('value', snapshot => {
        commit('setEventFlow', snapshot.val())
      })
    })
  },
  editFlowItem ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('flow')
      .child(payload.date)
      .child(payload.index)
      .remove()

    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('flow')
      .child(payload.date)
      .child(new Date(`1970-01-01T${payload.data.time}:00.000Z`).getTime())
      .set(payload.data)
  },
  deleteFlowItem ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('flow')
      .child(payload.date)
      .child(payload.index)
      .remove().then(() => {
        firebase.database().ref('events').child(state.currentEventToken).child('flow').once('value', snapshot => {
          commit('setEventFlow', snapshot.val() ? snapshot.val() : {})
        })
      })
  },
  deleteFlowByDate ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('flow')
      .child(payload)
      .remove().then(() => {
        firebase.database().ref('events').child(state.currentEventToken).child('flow').once('value', snapshot => {
          commit('setEventFlow', snapshot.val() ? snapshot.val() : {})
        })
      })
  },
  addMilestone ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('milestone')
      .child(payload.index)
      .set(payload.data).then(() => {
        firebase.database().ref('events')
          .child(state.currentEventToken)
          .child('milestone')
          .once('value', snapshot => {
            commit('setEventMilestone', snapshot.val())
          })
      })
  },
  deleteMilestone ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('milestone')
      .child(payload)
      .remove().then(() => {
        firebase.database().ref('events').child(state.currentEventToken).child('milestone').once('value', snapshot => {
          commit('setEventMilestone', snapshot.val() ? snapshot.val() : {})
        })
      })
  },
  editMilestone ({commit}, payload) {
    firebase.database().ref('events')
      .child(state.currentEventToken)
      .child('milestone')
      .child(payload.index)
      .update(payload.data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
