<template>
<div>
  <h2>Active Events</h2>
  <table>
    <tr class="headTr">
        <th>Event Name</th>
        <th>Event Date (yyyy-mm-dd)</th>
        <th>Team</th>
        <th>Position</th>
    </tr>
    <ActiveEventListItem v-if="getActiveEvents" v-for="(event, index) in getActiveEvents" :key="index" :event="event" :index="index"/>
    <tr v-if="Object.keys(getActiveEvents).length === 0">
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
    ...mapGetters(['getActiveEvents'])
  },
  components: {
    ActiveEventListItem, CreateNewEventForm, JoinEventForm
  }
}
</script>

<style>
tr.headTr:hover{
  background-color: rgba(0,0,0,0) !important;
}
</style>
