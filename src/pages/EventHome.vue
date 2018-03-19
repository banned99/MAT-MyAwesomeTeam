<template>
  <div>
    <EventMinorDetails />
    <!-- <MileStone v-if="milestoneView"/> -->
    <!-- <EventDetails /> -->
  </div>
</template>

<script>
import EventMinorDetails from '../components/EventMinorDetails'
// import EventDetails from '../components/EventDetails'
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
    EventMinorDetails
    // EventDetails
  }
}
</script>

<style>

</style>
