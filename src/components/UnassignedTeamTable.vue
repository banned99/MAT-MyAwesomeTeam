<template>
<div class="wrapper">
  <label class="lab-uns">Unassigned Staffs</label>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr class="headTr">
          <th>Name</th>
          <th v-if="owner || priority" colspan="6">Options</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <UnassignedTeamTableRow v-if="!!getUnassignedStaffs" v-for="staff in getUnassignedStaffs" :key="staff.uid" :staff="staff" :owner="owner" :priority="priority"/>
        <tr v-if="!getUnassignedStaffs || getUnassignedStaffs.length < 1">
          <td colspan="6">------ No Unassigned Staffs ------</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import UnassignedTeamTableRow from '../components/UnassignedTeamTableRow'

export default {
  name: 'unassignedteamtable',
  props: {
    owner: {
      type: Boolean
    },
    priority: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getUnassignedStaffs'])
  },
  components: {
    UnassignedTeamTableRow
  }
}
</script>

<style lang="css" scoped>
.wrapper {
  width: 100%;
max-height: 400px;
overflow-y: auto;
padding-bottom: 5em;
}
.lab-uns {
  display: block;
  text-align: center;
  color: white;
  font-weight: 900;
  font-size: 2em;
}
.headTr {
  font-size: 8px;
}
th {
  text-align: center;
}
td,th {
  padding-top: 1em;
  padding-bottom: 1em;
}
</style>
<style lang="css" scoped>
  @import '../assets/css/tablestyle.css';
</style>
