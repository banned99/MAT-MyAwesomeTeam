<template>
  <div>
    <!-- <ShowTimeline /> -->
    <EventMinorDetails />
    <!-- <MileStone v-if="milestoneView"/> -->
    <EventDetails :priority="isOwner || isPriorized"/>
    <RequestList :priority="isOwner || isPriorized"/>
    <StaffManager :priority="isOwner || isPriorized"/>
    <Chatter />
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
    ...mapGetters(['getUserUID', 'getEventOwner', 'getEventPriorizedStaffs']),
    isOwner: function () {
      return this.getUserUID === this.getEventOwner.uid
    },
    isPriorized: function () {
      return this.getUserUID === this.getEventPriorizedStaffs.uid
    }
  },
  methods: {
    ...mapActions(['pullEventData', 'getEventDate', 'resetEventData'])
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
