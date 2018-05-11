<template>
<div>
  <label>Unassigned Staffs</label>
  <table>
    <tr>
      <th>Name</th>
      <th>Options</th>
    </tr>
    <UnassignedTeamTableRow v-if="!!getUnassignedStaffs" v-for="staff in getUnassignedStaffs" :key="staff.uid" :staff="staff"/>
    <tr v-if="!getUnassignedStaffs || getUnassignedStaffs.length < 1">
      <td colspan="6">------ No Unassigned Staffs ------</td>
    </tr>
  </table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import UnassignedTeamTableRow from '../components/UnassignedTeamTableRow'

export default {
  name: 'unassignedteamtable',
  computed: {
    ...mapGetters(['getUnassignedStaffs'])
  },
  components: {
    UnassignedTeamTableRow
  }
}
</script>

<style>

</style>
