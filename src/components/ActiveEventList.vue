<template>
<div>
  <table>
    <tr class="headTr">
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
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActiveEventListItem from '../components/ActiveEventListItem'
import CreateNewEventForm from '../components/CreateNewEventForm'

export default {
  name: 'activeeventlist',
  computed: {
    ...mapGetters(['getEventsJoined'])
  },
  components: {
    ActiveEventListItem, CreateNewEventForm
  }
}
</script>

<style>
tr.headTr:hover{
  background-color: rgba(0,0,0,0) !important;
}
</style>
