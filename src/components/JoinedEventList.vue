<template>
<div>
  <h2 class="head-text">Joined Events</h2>
  <!--old-->
  <table>
    <tr class="headTr">
        <th>Event Name</th>
        <th>Event Date (yyyy-mm-dd)</th>
        <th>Team</th>
        <th>Position</th>
    </tr>
    <JoinedEventListItem v-if="getEventsJoined" v-for="(event, index) in getEventsJoined" :key="index" :event="event" :index="index"/>
    <tr class="tr-content" v-if="Object.keys(getEventsJoined).length === 0">
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

<style media="screen" scoped>
  @import '../assets/css/tablestyle.css';
tr.headTr:hover{
  background-color: rgba(0,0,0,0) !important;
}
tr.tr-content:hover {
  cursor: pointer !important;
}
tr {
  font-size: 1em;
}
.head-text {
  display: block;
  font-size: 1.5em;
  text-align: center;
}
</style>
