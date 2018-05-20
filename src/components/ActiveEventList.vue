<template>
<div class="list-wrapper">
  <p class="headtext">Active Events</p>
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
      <ActiveEventListItem v-if="getActiveEvents" v-for="(event, index) in getActiveEvents" :key="index" :event="event" :index="index"/>
      <tr v-if="Object.keys(getActiveEvents).length === 0">
        <td colspan="4"> ---- No joined events. Create or Join some! ---- </td>
      </tr>

    </tbody>
  </table>
  </div>

  <div class="em-space">

  </div>
  <div class="box-button-home">
    <CreateNewEventForm />
    <div class="space-bet">

    </div>
    <JoinEventForm />
  </div>
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
<style media="screen" scoped>
@import '../assets/css/tablestyle.css';
.em-space {
  height: 20px;
}
.tbl-content {
  background: rgba(255, 255, 255, 0.1);
}
tr {
  border-left: 1px solid black;
}
tr:hover {
  background-color: rgba(255,255,255,0.1);
  cursor: pointer;
}
.headtext {
  color: white;
  font-size: 2em;
}
.box-button-home {
  text-align: center;
  display: block;
}
.space-bet {
  display: inline-block;
  width: 5%;
}
.headtext {
  text-align: center;
  padding-top: 2em;
  top: 6em;
}
th {
  font-weight: 900;
  text-align: center !important;
}
.tbl-content {
  overflow-y: scroll;
  max-height: 400px;
}
</style>
