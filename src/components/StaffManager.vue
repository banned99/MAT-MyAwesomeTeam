<template>
  <div>
    <h1>Manage Team & Staffs</h1>
    <TeamTable v-for="team in getEventTeams" :key="team.key" :team="team"/>
    <modal :clickToClose="true">
      <h1>Add new Team</h1>
      <h3>Enter team name.</h3>
      <p v-if="!validateName">Enter your name!</p>
      <input type="text" v-model="teamName" required placeholder="Team Name"> <br>
      <button type="button" @click="addTeam(teamName)" :disabled="!validateName">Submit</button>
    </modal>
  </div>
</template>

<script>
import TeamTable from '../components/TeamTable'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'staffmanager',
  data () {
    return {
      teamName: ''
    }
  },
  computed: {
    ...mapGetters(['getEventTeams']),
    validateName () {
      return !!this.teamName.trim()
    }
  },
  methods: {
    ...mapActions(['addTeam'])
  },
  components: {
    TeamTable
  }
}
</script>

<style>

</style>
