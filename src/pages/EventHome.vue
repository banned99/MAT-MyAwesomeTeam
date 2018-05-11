<template>
  <div>
    <HeadHome />
    <div class="WrapTab">
    <vue-tabs>
     <v-tab title="Info">
       <!-- <ShowTimeline /> -->
       <!-- <EventMinorDetails /> -->
       <!-- <MileStone v-if="milestoneView"/> -->
       <EventDetails :priority="isOwner || isPriorized" :isFinished="isFinished"/>
       <RequestList :priority="isOwner || isPriorized" v-if="!isFinished"/>

     </v-tab>

     <v-tab title="Chat">
       <Chatter :isFinished="isFinished"/>
     </v-tab>
     <v-tab title="Flow">
       <Flow />
     </v-tab>
     <v-tab title="Team Manage">
       <StaffManager :priority="isOwner || isPriorized" v-if="!isFinished"/>
     </v-tab>
     <v-tab title="Milestone">
       <!--Milestone-->
     </v-tab>
  </vue-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import EventMinorDetails from '../components/EventMinorDetails'
import EventDetails from '../components/EventDetails'
// import ShowTimeline from '../components/ShowTimeline'
import Chatter from '../components/Chatter'
import StaffManager from '../components/StaffManager'
import RequestList from '../components/RequestList'
import { mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'
import Flow from '../components/Flow'
import HeadHome from '../components/HeadHome'
import TabEventHome from '../components/TabEventHome'

Vue.use(firebase)

export default {
  name: 'eventhome',
  destroyed () {
    this.resetEventData()
  },
  created () {
    this.pullEventData(this.$route.params.eventId.toString())
  },
  computed: {
    ...mapGetters(['getUserUID', 'getEventOwner', 'getEventPriorizedStaffs', 'getEventDate']),
    isOwner: function () {
      return this.getUserUID === this.getEventOwner.uid
    },
    isPriorized: function () {
      return this.getUserUID === this.getEventPriorizedStaffs.uid
    },
    isFinished: function () {
      return new Date().getTime() > new Date(this.getEventDate.end).getTime()
    }
  },
  methods: {
    tellEventID: function () {
      // firebase.database().ref('events/' + this.$route.params.eventId).on('value', function(snapshot)) {
      //   console.log(snapshot.val())
      console.log(this.$route.params.eventId)
    },
    ...mapActions(['pullEventData', 'resetEventData'])
  },
  components: {
    EventMinorDetails,
    EventDetails,
    RequestList,
    StaffManager,
    Chatter,
    Flow,
    HeadHome,
    TabEventHome
  }
}
</script>

<style scoped>
.WrapTab {
  width: 100%;
  height: 400px;
}
.vue-tabs .nav > li {
  width: 20%;
}
button {
  color: black!important;
}
</style>
