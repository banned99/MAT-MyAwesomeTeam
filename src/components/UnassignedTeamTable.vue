<template>
<div>
  <label>Unassigned Staffs</label>
  <table>
    <tr>
      <th>Name</th>
      <th>Options</th>
    </tr>
    <tr v-if="!!getUnassignedStaffs" v-for="staff in getUnassignedStaffs" :key="staff.key">
      <td>{{ staff.displayName }}</td>
      <td>Team
        <select name="team">
          <option value="" disabled selected hidden>Choose team</option>
          <option v-for="name in getTeamNames" :key="name.key" :value="name">{{ name[0].toUpperCase() + name.substr(1) }}</option>
        </select>
      </td>
      <td>Priority: 
        <select name="prio">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </td>
      <td>
        <button>Submit</button>
      </td>
    </tr>
    <tr v-if="!getUnassignedStaffs || getUnassignedStaffs.length < 1">
      <td colspan="6">------ No Unassigned Staffs ------</td>
    </tr>
  </table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'unassignedteamtable',
  computed: {
    ...mapGetters(['getUnassignedStaffs', 'getTeamNames'])
  }
}
</script>

<style>

</style>
