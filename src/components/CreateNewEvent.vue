<template>
  <div>
    <h1>Create New Event</h1>
    {{ error }}
    <input type="text" v-model="event.name" placeholder="Event Name" />
    <input type="date" v-model="event.date.start" placeholder="Event Start Date">
    <input type="date" v-model="event.date.end" placeholder="Event End Date">
    <textarea v-model="event.desc" rows="4" cols="50" placeholder="Event Description"/>
    <h2>Add Teams</h2>
    <DepartInput @add="addDepart" @remove="removeDepart" :departlist="departnamelist"/>
    <button @click="createEvent" :disabled="loading">Create Event</button>
  </div>
</template>

<script>
import DepartInput from '../components/DepartInput'

export default {
  name: 'createnewevent',
  data: () => {
    return {
      departnamelist: ['boss'],
      event: {
        token: '',
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
  computed: {
    // add Validation
    error: function () {
      return this.$store.getters.getError
    },
    loading: function () {
      return this.$store.getters.getLoading
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
    addOwner: function (user) {
      let eventmember = {
        uid: user.uid,
        priority: true,
        name: user.displayName,
        joinBy: 'create',
        acceptBy: 'create',
        depart: {
          name: 'boss',
          role: 'head'
        }
      }
      this.event.members.push(eventmember)
      let departmember = {
        name: user.displayName,
        role: 'head'
      }
      this.event.departs.boss.members.push(departmember)
    },
    createEvent: function () {
      let user = this.$store.getters.getCurrentUser
      this.event.token = this.createToken()
      this.event.owner = user.uid
      this.event.createDate = this.now()
      this.event.departs = this.departToObject()
      this.addOwner(user)
      this.$store.dispatch('createNewEvent', {
        event: this.event,
        user: user
      })
    },
    addDepart: function (departname) {
      this.departnamelist.push(departname)
    },
    removeDepart: function (index) {
      this.departnamelist.splice(index, 1)
    }
  },
  watch: {
    error: function (value) {
      if (value) {
        this.alert = true
      }
    },
    alert: function (value) {
      if (!value) {
        this.$store.dispatch('setError', null)
      }
    }
  },
  components: {
    DepartInput
  }
}
</script>
