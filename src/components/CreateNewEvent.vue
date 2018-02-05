<template>
  <div>
    <h1>Create New Event</h1>
    <input type="text" v-model="event.name" placeholder="Event Name" />
    <input type="date" v-model="event.date.start" placeholder="Event Start Date">
    <input type="date" v-model="event.date.end" placeholder="Event End Date">
    <textarea v-model="event.desc" rows="4" cols="50" />
    <h2>Add Departs</h2>
    <DepartInput @add="addDepart" @remove="removeDepart" :departlist="departnamelist"/>
    <button @click="createEvent" >Create Event</button>
  </div>
</template>

<script>
import { database, auth } from '../utils/firebase'
import DepartInput from '../components/DepartInput'

export default {
  name: 'createnewevent',
  data: () => {
    return {
      departnamelist: ['boss'],
      event: {
        name: '',
        date: {
          start: '',
          end: ''
        },
        desc: '',
        createDate: '',
        owner: '',
        departs: {},
        members: [],
        requests: []
      }
    }
  },
  methods: {
    createToken: function () {
      let token = Math.random().toString(36).substring(2)
      return token
    },
    now: function () {
      let date = new Date()
      return (date.toLocaleDateString()) + ' ' + (date.toLocaleTimeString())
    },
    departToObject: function () {
      let departs = {}
      let members = []
      for (let aDepart in this.departnamelist) {
        departs[this.departnamelist[aDepart]] = {members}
      }
      return departs
    },
    addOwner: function () {
      let eventmember = {
        uid: auth.currentUser.uid,
        priority: true,
        name: auth.currentUser.displayName,
        joinBy: 'create',
        acceptBy: 'create',
        depart: {
          name: 'boss',
          role: 'head'
        }
      }
      this.event.members.push(eventmember)

      let departmember = {
        name: auth.currentUser.displayName,
        role: 'head'
      }
      this.event.departs.boss.members.push(departmember)
    },
    addEventsJoined: function (token) {
      let event = {
        name: this.event.name,
        date: this.event.date,
        dept: {
          name: 'boss',
          role: 'head'
        }
      }
      database.ref('users').child(auth.currentUser.uid).child('eventsJoined/' + token).set(event)
    },
    createEvent: function () {
      console.log(auth.currentUser)
      let token = this.createToken()
      this.event.owner = auth.currentUser.uid
      this.event.createDate = this.now()
      this.event.departs = this.departToObject()
      this.addOwner()
      this.addEventsJoined(token)
      console.log(this.event)
      database.ref('events').child(token).set(this.event)
      // this.$router.replace('event/' + token)
    },
    addDepart: function (departname) {
      this.departnamelist.push(departname)
    },
    removeDepart: function (index) {
      this.departnamelist.splice(index, 1)
    }
  },
  components: {
    DepartInput
  }
}
</script>
