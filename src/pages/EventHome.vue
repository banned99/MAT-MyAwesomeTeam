<template>
  <div>
    <HeadHome />
    <!-- <ShowTimeline /> -->
    <EventMinorDetails />
    <!-- <MileStone v-if="milestoneView"/> -->
    <!-- <EventDetails :priority="isOwner || isPriorized"/> -->
    <RequestList :priority="isOwner || isPriorized"/>
    <StaffManager :priority="isOwner || isPriorized"/>
    <!-- <Chatter :isFinished="isFinished"/> -->
    <!-- <button type="button" @click="tellEventID()" name="button">WWWW</button> -->
    <!-- <Flow /> -->
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
    HeadHome
  }
}
</script>

<style scoped>
body {
  background-color: #484848 !important;
}
</style>
