<template>
  <div>
    <h1>Create New Event</h1>
    <input type="text" v-model="event.name" placeholder="Event Name" />
    <input type="date" v-model="event.date.start" placeholder="Event Start Date">
    <input type="date" v-model="event.date.end" placeholder="Event End Date">
    <textarea v-model="event.desc" rows="4" cols="50" />
    <button @click="createEvent">Create Event</button>
  </div>
</template>

<script>
import { database, auth } from '../utils/firebase'

export default {
  name: 'createnewevent',
  data: () => {
    return {
      event: {
        name: '',
        date: {
          start: '',
          end: ''
        },
        desc: '',
        createDate: '',
        owner: ''
      }
    }
  },
  methods: {
    createToken: function () {
      var token = Math.random().toString(36).substring(2)
      return token
    },
    now: function () {
      let date = new Date()
      return (date.toLocaleDateString()) + ' ' + (date.toLocaleTimeString())
    },
    createEvent: function () {
      let token = this.createToken()
      this.event.owner = auth.currentUser.uid
      this.event.createDate = this.now()
      database.ref('events').child(token).set(this.event)
      this.$router.replace('event/' + token)
    }
  }
}
</script>
