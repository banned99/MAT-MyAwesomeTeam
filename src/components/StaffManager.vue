<template>
  <div>
    <h1>Manage Team & Staffs</h1>
    <TeamTable v-for="(team, index) in getEventTeams" :key="team.key" :team="team" :index="index"/>
    <modal name="addTeamModal" :clickToClose="true">
      <div class="modal-addstaff">
        <h1>Add new Team</h1>
        <h3>Enter team name.</h3>
        <p v-if="!validateName">Enter team name!</p>
        <label>Team Name: </label><input type="text" class="txt-name" v-model="teamName" required placeholder="Team Name"> <br>
        <label>Team Description: </label><textarea class="txt-des" v-model="desc" placeholder="Team Description"></textarea><br>
        <button type="button" @click="addNewTeam()" :disabled="!validateName">Submit</button>
      </div>
    </modal>
    <button @click="showAddTeamModal()">Add Team</button>
  </div>
</template>

<script>
import TeamTable from '../components/TeamTable'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'staffmanager',
  data () {
    return {
      teamName: '',
      desc: '',
      members: []
    }
  },
  computed: {
    ...mapGetters(['getEventTeams']),
    validateName () {
      return !!this.teamName.trim()
    }
  },
  methods: {
    ...mapActions(['addTeam']),
    showAddTeamModal () {
      this.$modal.show('addTeamModal')
    },
    hideModal () {
      this.$modal.hide('addTeamModal')
    },
    cancel () {
      this.teamName = ''
      this.desc = ''
      this.members = ''
      this.hideModal()
    },
    addNewTeam () {
      this.addTeam({name: this.teamName, data: {desc: this.desc, members: this.members}})
      this.cancel()
    }
  },
  components: {
    TeamTable
  }
}
</script>

<style scoped>
.modal-addstaff {
  text-align: center;
}
.txt-des {
  resize: none;
}
.txt-name {
  width: 80px;

}
h1 {
  color: white;
}
</style>
