<template>
  <div>
    <h2>{{ team['.key'][0].toUpperCase() + team['.key'].slice(1) }}</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Role</th>
      </tr>
      <TeamTableRow v-for="member in team.members" :key="member.key"/>
    </table> 
  </div>
</template>

<script>
import TeamTableRow from '../components/TeamTableRow'

export default {
  name: 'TeamTable',
  props: {
    team: {
      required: true,
      type: Object
    }
  },
  components: {
    TeamTableRow
  }
}
</script>

<style>

</style>
