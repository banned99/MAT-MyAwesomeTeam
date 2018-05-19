<template>
<div id="inPage">
<div class="bigbox">
  <label class="Head-detail-page">Details</label>
  <div class="box evname">
    <label class="h-label">Event Name</label>
    <p v-show="!editing">{{ getEvent.name }}</p>
    <input type="text" v-model="event.name" v-show="editing" />
  </div>
  <div class="box desc">
    <label class="h-label">Description</label>
    <p v-if="!editing && !!getEvent.desc.trim()">{{ getEvent.desc }}</p>
    <p v-if="!editing && !getEvent.desc.trim()">------- No description. -------</p>
    <textarea v-model="event.desc" cols="30" rows="10" v-show="editing" ></textarea>
  </div>
    <div class="box date">
      <label class="h-label">Date</label>
      <p v-if="!editing">{{ getEvent.date.start }} to {{ getEvent.date.end }}</p>
      <div v-if="editing">
        <input class="in-date" type="date" v-model="event.date.start" :min="new Date().toISOString()" max="31/12/2099"/>
        to
        <input class="in-date" type="date" v-model="event.date.end" :min="new Date().toISOString()" max="31/12/2099" />
      </div>
    </div>
    <div class="box create-date">
      <label class="h-label">Create Date</label>
      <p>{{ getEvent.createDate }}</p>
    </div>

  <div class="box Owner">
    <label class="h-label">Events Head</label>
    <p>{{ getEvent.owner.name }}</p>
  </div>
  <div class="bb-total">
    <div class="box total-staff">
      <label class="h-label">Total Staffs</label>
      {{ Object.keys(getEvent.staffs).length }}
    </div>
    <div class="box totalteam">
      <label class="h-label">Total Teams</label>
      {{ getEvent.teams ? Object.keys(getEvent.teams).length : 0 }}
    </div>
  </div>
  <br>
</div>
    <div class="bt-box" v-if="!isFinished">
      <button class="EvDetails-button" @click="toggleEdit" v-show="!editing">Edit</button>
      <button class="EvDetails-button" @click="attemptDelete" v-show="!editing">Delete</button>
      <button class="EvDetails-button" @click="confirmEdit" v-show="editing">Confirm</button>
      <button class="EvDetails-button" @click="cancelEdit" v-show="editing">Cancel</button>
    </div>
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
  props: {
    isFinished: {
      type: Boolean
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
          this.$router.push('home')
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

<style type="text/css" scoped>
.inPage {
  height: 100%;
  text-align: left !important;
  overflow: auto;
}
.EvDetails-button {
  font-weight: bold;
  background-color: #ffa000;
  color: rgba(255,255,255,1);
  width: 30%;
  height: 50px;
  border-radius: 10px;
  border: 0px;
}
.EvDetails-button:hover {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  color: black;
}
.in-date {
  width: 45%;
}
.box {
  font-size: 20px;
  color: white;
}
.box.total-staff {
  display: inline;
}
.box.totalteam {
  display: inline;
}
.box.date {
  padding: 0.5em;
  text-align: left;
  border-bottom: 1px solid #fff;
}
.box.create-date {
  padding: 0.5em;
  text-align: left;
  border-bottom: 1px solid #fff;
}
.box.evname {
    padding: 0.5em;
    text-align: left;
    border-bottom: 1px solid #fff;
}
.box.desc {
  padding: 0.5em;
  text-align: left;
  border-bottom: 1px solid #fff;
}
.box.Owner {
  padding: 0.5em;
  text-align: left;
  border-bottom: 1px solid #fff;
}
.bb-total {
  padding-top: 3em;
  text-align: center;
}
.Head-detail-page {
  margin: auto;
  font-size: 2em;
  color: #fff;
}
.bt-box {
  text-align: center;
}
.h-label{
  font-size: 1em;
  font-weight: bolder;
}
</style>
