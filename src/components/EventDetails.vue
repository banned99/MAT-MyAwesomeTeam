<template>
  <div id="inPage">
    <h1>Event Details</h1>
    <div>
      <label>Event Name</label>
      <p v-show="!editing">{{ getEvent.name }}</p>
      <input type="text" v-model="event.name" v-show="editing" />
    </div>
    <div>
      <label>Description</label>
      <p v-show="!editing && getEvent.desc !== ''">{{ getEvent.desc }}</p>
      <p v-show="!editing && getEvent.desc === ''">------- No description. -------</p>
      <textarea v-model="event.desc" cols="30" rows="10" v-show="editing" ></textarea>
    </div>
    <div>
      <label>Date</label>
      <p v-if="!editing">{{ getEvent.date.start }} to {{ getEvent.date.end }}</p>
      <div v-if="editing">
        <input type="date" v-model="event.date.start" :min="new Date().toISOString()" max="31/12/2099"/>
        to
        <input type="date" v-model="event.date.end" :min="new Date().toISOString()" max="31/12/2099" />
      </div>
    </div>
    <div>
      <label>Create Date</label>
      <p>{{ getEvent.createDate }}</p>
    </div>
    <div>
      <label>Owner</label>
      <p>{{ getEvent.owner.name }}</p>
    </div>
    <div>
      <label>Total Staffs</label>
      {{ getEvent.staffs.length }}
    </div>
    <div>
      <label>Total Teams</label>
      {{ Object.keys(getEvent.teams).length }}
    </div><br>
    <button @click="toggleEdit" v-show="!editing">Edit</button>
    <button @click="attemptDelete" v-show="!editing">Delete</button>
    <button @click="confirmEdit" v-show="editing">Confirm</button>
    <button @click="cancelEdit" v-show="editing">Cancel</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'eventdetails',
  data: () => {
    return {
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
        milestone: [],
        flow: {},
        chatHistory: [],
        voiceHistory: [],
        fileHistory: []
      },
      editing: false
    }
  },
  computed: {
    ...mapGetters(['getEvent', 'getUserUID', 'getEventToken'])
  },
  methods: {
    ...mapActions(['deleteEvent', 'updateEvent', 'deleteJoinedEvents']),
    toggleEdit: function () {
      this.editing = true
      this.event = this.getEvent
    },
    attemptDelete: function () {
      this.event = this.getEvent
      if (confirm('Are you sure to DELETE this event? This action cannot be undone')) {
        var eventName = prompt('Insert event name', '')
        if (eventName === this.event.name) {
          this.deleteEvent({
            uid: this.getUserUID,
            eventId: this.getEventToken
          })
          this.deleteJoinedEvents({
            token: this.getEventToken
          })
        }
      }
    },
    confirmEdit: function () {
      if (confirm('Are you sure to EDIT this event? This action cannot be undone')) {
        this.updateEvent({
          event: this.event,
          eventId: this.getEventToken
        })
      }
      this.editing = false
    },
    cancelEdit: function () {
      this.editing = false
      this.event = this.getEvent
    }
  }
}
</script>

<style type="text/css">
body{
  background-color: rgba(255,255,255,1) !important;
}
</style>
