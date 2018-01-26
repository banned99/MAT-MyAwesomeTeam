<template>
  <table>
    <tr>
        <th>#</th>
        <th>Event Name</th>
        <th>Event Date</th>
        <th>Depart</th>
        <th>Position</th>
    </tr>
    <EventListItem v-for="(event, index) in joinedevents" :key="event.id" :event="event" :index="index" />
  </table>
</template>

<script>
import { database } from '../utils/firebase'
import EventListItem from '../components/EventListItem'

export default {
  name: 'comingeventlist',
  firebase: {
    joinedevents: {
      source: database.ref('users/' + '0fWeAs2z9NT3D2CGJ3u6PY1nEuk1' + '/eventsJoined')
    }
  },
  components: {
    EventListItem
  }
}
</script>

