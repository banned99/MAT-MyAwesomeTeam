<template>
  <div>
    <WebHeader />
    <div class="WrapTab">
    <vue-tabs>
     <v-tab title="Info">
       <!-- <EventMinorDetails :owner="isOwner" :priority="isPriorized"/> -->
       <EventDetails :owner="isOwner" :finished="isFinished"/>
       <RequestList :owner="isOwner" :priority="isPriorized" v-if="!isFinished"/>
     </v-tab>
     <v-tab title="Chat">
       <Chatter :finished="isFinished"/>
     </v-tab>
     <v-tab title="Flow">
       <Flow :owner="isOwner" :finished="isFinished"/>
     </v-tab>
     <v-tab title="Manage">
       <StaffManager :owner="isOwner" :priority="isPriorized" :finished="isFinished"/>
     </v-tab>
     <v-tab title="Milestone">
       <Milestone :owner="isOwner" :finished="isFinished"/>
     </v-tab>
  </vue-tabs>
    </div>
  </div>
</template>

<script>
import EventMinorDetails from '../components/EventMinorDetails'
import EventDetails from '../components/EventDetails'
import Chatter from '../components/Chatter'
import StaffManager from '../components/StaffManager'
import RequestList from '../components/RequestList'
import { mapActions, mapGetters } from 'vuex'
import Flow from '../components/Flow'
import WebHeader from '../components/WebHeader'
import TabEventHome from '../components/TabEventHome'
import Milestone from '../components/Milestone'

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
      return this.getEventPriorizedStaffs.some(el => el.uid === this.getUserUID)
    },
    isFinished: function () {
      return new Date().getTime() >= new Date(this.getEventDate.end).getTime() + 86400000
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
    WebHeader,
    TabEventHome,
    Milestone
  }
}
</script>
<style media="screen" scoped>
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
  height: 100%;
  overflow: scroll;
}
.vue-tabs .nav > li {
  width: 20%;
}

button {
  color: black!important;
}
</style>
<style media="screen">
.vue-tabs .nav > li > a {
  padding: 8px 0.8em !important;
  margin-right: 0em !important;
}
</style>
