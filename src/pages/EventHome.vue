<template>
  <div>
    <!-- <ShowTimeline /> -->
    <EventMinorDetails />
    <!-- <MileStone v-if="milestoneView"/> -->
    <EventDetails :priority="isOwner || isPriorized" :isFinished="isFinished"/>
    <RequestList :priority="isOwner || isPriorized" v-if="!isFinished"/>
    <StaffManager :priority="isOwner || isPriorized" v-if="!isFinished"/>
    <Chatter :isFinished="isFinished"/>
  </div>
</template>

<script>
import EventMinorDetails from '../components/EventMinorDetails'
import EventDetails from '../components/EventDetails'
// import ShowTimeline from '../components/ShowTimeline'
import Chatter from '../components/Chatter'
import StaffManager from '../components/StaffManager'
import RequestList from '../components/RequestList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'eventhome',
  destroyed () {
    this.resetEventData()
  },
  created () {
    this.pullEventData(this.$route.params.eventId)
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
    // ShowTimeline,
    RequestList,
    StaffManager,
    Chatter
  }
}
</script>

<style>

</style>
