<template>
  <div id="inPage">
    <h1 class="Head-detail-page">Event Details</h1>
<div class="bigbox">
  <div class="box evname">
    <label>Event Name</label>
    <p v-show="!editing">{{ getEvent.name }}</p>
    <input type="text" v-model="event.name" v-show="editing" />
  </div>
  <div class="box desc">
    <label>Description</label>
    <p v-if="!editing && !!getEvent.desc.trim()">{{ getEvent.desc }}</p>
    <p v-if="!editing && !getEvent.desc.trim()">------- No description. -------</p>
    <textarea v-model="event.desc" cols="30" rows="10" v-show="editing" ></textarea>
  </div>
  <div class="box date">
    <label>Date</label>
    <p v-if="!editing">{{ getEvent.date.start }} to {{ getEvent.date.end }}</p>
    <div v-if="editing">
      <input class="in-date" type="date" v-model="event.date.start" :min="new Date().toISOString()" max="31/12/2099"/>
      to
      <input class="in-date" type="date" v-model="event.date.end" :min="new Date().toISOString()" max="31/12/2099" />
    </div>
  </div>
  <div class="box create-date">
    <label>Create Date</label>
    <p>{{ getEvent.createDate }}</p>
  </div>
  <div class="box Owner">
    <label>Owner</label>
    <p>{{ getEvent.owner.name }}</p>
  </div>
  <div class="box total-staff">
    <label>Total Staffs</label>
    {{ Object.keys(getEvent.staffs).length }}
  </div>
  <div class="box totalteam">
    <label>Total Teams</label>
    {{ getEvent.teams ? Object.keys(getEvent.teams).length : 0 }}
  </div><br>
</div>
    <div v-if="!isFinished">
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
          this.$router.replace('home')
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
.Head-detail-page {
  font-weight: bolder;
  color: rgba(244,244,244,1);
}
.box {
  margin-left: 20px;
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
  font-size: 1em;
  width: 40%;
  text-align: center;
  display: inline-block;
}
.box.create-date {
  font-size: 1em !important;
  width: 40%;
  text-align: center;
  display: inline-block;
}
.box.evname {
  border: 2px solid white;
}
.box.desc {
  border: 2px solid white;
}
.bigbox {
  width: 90%;
  margin: auto;
  padding-bottom: 20px;
}

</style>
