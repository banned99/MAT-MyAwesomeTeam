<template>
  <div>
    Name: <input type="text" v-model="event.name" :disabled="!editing"> Create Date: {{ event.createDate }}<br/>
    Description: <textarea v-model="event.desc" :disabled="!editing"></textarea> <br/>
    Date: <input type="date" v-model="event.date.start" :disabled="!editing">
    to <input type="date" v-model="event.date.end" :disabled="!editing"> <br/>
    Head (Owner): {{ ownerName }}
    <button @click="toggleEdit" v-show="!editing">Edit</button>
    <button @click="attemptDelete" v-show="!editing">Delete</button>
    <button @click="confirmEdit" v-show="editing">Confirm</button>
    <button @click="cancelEdit" v-show="editing">Cancel</button>
  </div>
</template>

<script>
import firebase from '../utils/firebase'

export default {
  name: 'eventdetails',
  data: () => {
    return {
      editing: false
    }
  },
  created: function () {
    var ref = firebase.database().ref('events/' + this.$route.params.eventId)
    this.$bindAsObject('event', ref)
  },
  computed: {
    error: function () {
      return this.$store.getters.getError
    },
    loading: function () {
      return this.$store.getters.getLoading
    },
    ownerName: function () {
      firebase.database().ref('users/' + this.event.owner).once('value').then(
        snapshot => {
          return snapshot.val()
        }
      )
    }
  },
  methods: {
    toggleEdit: function () {
      this.editing = true
    },
    attemptDelete: function () {
      if (confirm('Are you sure to DELETE this event? This action cannot be undone')) {
        var eventName = prompt('Insert event name', '')
        if (eventName === this.event.name) {
          this.$store.dispatch('deleteEvent', {
            eventId: this.$route.params.eventId
          })
        }
      }
    },
    confirmEdit: function () {
      if (confirm('Are you sure to EDIT this event? This action cannot be undone')) {
        this.$store.dispatch('updateEvent', {
          edit: this.edit,
          eventId: this.$route.params.eventId
        })
      }
    },
    cancelEdit: function () {
      this.editing = false
    }
  }
}
</script>
