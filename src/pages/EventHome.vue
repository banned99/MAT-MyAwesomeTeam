<template>
  <div>
    <HeadEventHome />
    <div class="WrapTab">
    <vue-tabs>
     <v-tab title="Info">
       <!-- <EventMinorDetails /> -->
       <EventDetails :priority="isOwner || isPriorized" :isFinished="isFinished"/>
       <RequestList :priority="isOwner || isPriorized" v-if="!isFinished"/>
     </v-tab>
     <v-tab title="Chat">
       <Chatter :isFinished="isFinished"/>
     </v-tab>
     <v-tab title="Flow">
       <Flow />
     </v-tab>
     <v-tab title="Manage">
       <StaffManager :priority="isOwner || isPriorized" v-if="!isFinished"/>
     </v-tab>
     <v-tab title="Milestone">
       <Milestone />
     </v-tab>
  </vue-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import EventMinorDetails from '../components/EventMinorDetails'
import EventDetails from '../components/EventDetails'
import Chatter from '../components/Chatter'
import StaffManager from '../components/StaffManager'
import RequestList from '../components/RequestList'
import { mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'
import Flow from '../components/Flow'
import HeadEventHome from '../components/HeadEventHome'
import TabEventHome from '../components/TabEventHome'
import Milestone from '../components/Milestone'

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
    ...mapActions(['pullEventData', 'resetEventData'])
  },
  components: {
    EventMinorDetails,
    EventDetails,
    RequestList,
    StaffManager,
    Chatter,
    Flow,
    HeadEventHome,
    TabEventHome,
    Milestone
  }
}
</script>
<style media="screen">
.WrapTab {
  display: block;
  position:  fixed;
  width:  100%;
  top: 45px;
  }
</style>
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
