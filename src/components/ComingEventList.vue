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
    <CreateNewEventItem />
  </table>
</template>

<script>
import firebase from '../utils/firebase'
import EventListItem from '../components/EventListItem'
import CreateNewEventItem from '../components/CreateNewEventItem'

export default {
  name: 'comingeventlist',
  created: function () {
    var uid = (this.$store.getters.getCurrentUser).uid
    var ref = firebase.database().ref('users/' + uid + '/eventsJoined')

    this.$bindAsArray('joinedevents', ref)
  },
  components: {
    EventListItem, CreateNewEventItem
  }
}
</script>

<style media="screen">
  table{
    border-style: solid;
    border-color: black;
  }
</style>
