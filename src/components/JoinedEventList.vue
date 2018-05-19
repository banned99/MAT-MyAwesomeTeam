<template>
<div>
  <h2>Joined Events</h2>
  <table>
    <tr class="headTr">
        <th>Event Name</th>
        <th>Event Date (yyyy-mm-dd)</th>
        <th>Team</th>
        <th>Position</th>
    </tr>
    <JoinedEventListItem v-if="getEventsJoined" v-for="(event, index) in getEventsJoined" :key="index" :event="event" :index="index"/>
    <tr v-if="Object.keys(getEventsJoined).length === 0">
      <td colspan="4"> ---- No joined events. ---- </td>
    </tr>
  </table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import JoinedEventListItem from '../components/JoinedEventListItem'

export default {
  name: 'joinedeventlist',
  computed: {
    ...mapGetters(['getEventsJoined'])
  },
  components: {
    JoinedEventListItem
  }
}
</script>

<style lang="css" scoped>
tr.headTr:hover{
  background-color: rgba(0,0,0,0) !important;
}
</style>
<style media="screen" scoped>
  @import '../assets/css/tablestyle.css'
</style>
