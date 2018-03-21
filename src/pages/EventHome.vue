<template>
  <div>
    <ShowTimeline />
    <EventMinorDetails />
    <!-- <MileStone v-if="milestoneView"/> -->
    <EventDetails />
  </div>
</template>

<script>
import EventMinorDetails from '../components/EventMinorDetails'
import EventDetails from '../components/EventDetails'
import ShowTimeline from '../components/ShowTimeline'
import { mapActions } from 'vuex'

export default {
  name: 'eventhome',
  destroyed () {
    this.resetEventData()
  },
  created () {
    this.pullEventData(this.$route.params.eventId)
  },
  methods: {
    ...mapActions(['pullEventData', 'getEventDate', 'resetEventData'])
  },
  components: {
    EventMinorDetails,
    EventDetails,
    ShowTimeline
  }
}
</script>

<style>

</style>
