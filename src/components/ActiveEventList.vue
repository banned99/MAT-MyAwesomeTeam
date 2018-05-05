<template>
<div>
  <h2>Active Events</h2>
<<<<<<< HEAD
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr class="headTr">
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Team</th>
            <th>Position</th>
        </tr>
      </thead>
      </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
  <tbody>
=======
  <table>
    <tr class="headTr">
      <th>Event Name</th>
      <th>Event Date (yyyy-mm-dd)</th>
      <th>Team</th>
      <th>Position</th>
    </tr>
>>>>>>> 2dd23cc1290bf65d48af5bfd340380d180a6b5ea
    <ActiveEventListItem v-if="getActiveEvents" v-for="(event, index) in getActiveEvents" :key="index" :event="event" :index="index"/>
    <tr v-if="Object.keys(getActiveEvents).length === 0">
      <td colspan="4"> ---- No joined events. Create or Join some! ---- </td>
    </tr>
  </tbody>
</table>
</div>


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
