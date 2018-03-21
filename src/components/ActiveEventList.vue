<template>
<div>
  <table>
    <tr>
        <th>Event Name</th>
        <th>Event Date</th>
        <th>Team</th>
        <th>Position</th>
    </tr>
    <ActiveEventListItem v-if="getEventsJoined" v-for="(event, index) in getEventsJoined" :key="index" :event="event" :index="index"/>
    <tr v-if="!getEventsJoined">
      <td colspan="4"> ---- No joined events. Create or Join some! ---- </td>
    </tr>
  </table>
  <CreateNewEventForm />
  <JoinEventForm />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActiveEventListItem from '../components/ActiveEventListItem'
import CreateNewEventForm from '../components/CreateNewEventForm'
import JoinEventForm from '../components/JoinEventForm'

export default {
  name: 'activeeventlist',
  computed: {
    ...mapGetters(['getEventsJoined'])
  },
  components: {
    ActiveEventListItem, CreateNewEventForm, JoinEventForm
  }
}
</script>

<style>

</style>
