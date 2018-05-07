<template>
  <div>
    <div v-if="!editing">
      <label>{{ index[0].toUpperCase() + index.substring(1) }}</label>
      <p>{{ team.desc }}</p>
      <button @click="editing = true">Edit</button>
      <button @click="deleteATeam()">Delete</button>
    </div>
    <div v-if="editing">
      <input type="text" v-model="newTeamName" placeholder="Team Name"> <br>
      <input type="text" v-model="newTeamDesc" placeholder="Team Description"> <br>
      <button @click="editATeam()">Confirm</button>
      <button @click="cancel()">Cancel</button>
    </div>
    <table>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th colspan="5">Options</th>
      </tr>
      <TeamTableRow v-for="member in team.members" :key="member.key" :member="member"/>
    </table> 
  </div>
</template>

<script>
import TeamTableRow from '../components/TeamTableRow'
import { mapActions } from 'vuex'

export default {
  name: 'TeamTable',
  data () {
    return {
      editing: false,
      newTeamName: '',
      newTeamDesc: ''
    }
  },
  props: {
    team: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: String
    }
  },
  methods: {
    ...mapActions(['editTeam', 'updateJoinedEventTeam', 'deleteTeam']),
    editATeam () {
      if (confirm('Are you sure to UPDATE this team? This action cannot be undone')) {
        this.editTeam({index: this.index, data: {newTeamName: this.newTeamName, newTeamDesc: this.newTeamDesc}})
        this.updateJoinedEventTeam({index: this.index, data: {newTeamName: this.newTeamName}})
      }
    },
    cancel () {
      this.newTeamName = ''
      this.newTeamDesc = ''
      this.editing = false
    },
    deleteATeam () {
      if (confirm('Are you sure to DELETE this team? This action cannot be undone')) {
        this.deleteTeam(this.index)
        this.updateJoinedEventTeam({index: this.index, data: {newTeamName: 'unassigned'}})
      }
    }
  },
  components: {
    TeamTableRow
  }
}
</script>

<style>

</style>
