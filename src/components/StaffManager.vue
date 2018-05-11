<template>
  <div>
    <h1>Manage Team & Staffs</h1>
    <TeamTable v-for="(team, index) in getEventTeams" :key="team.key" :team="team" :index="index"/>
    <UnassignedTeamTable />
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
import UnassignedTeamTable from '../components/UnassignedTeamTable'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'staffmanager',
  data () {
    return {
      teamName: '',
      desc: '',
      head: ''
    }
  },
  computed: {
    ...mapGetters(['getEventTeams', 'getUnassignedStaffs']),
    validateName () {
      let exist = !!Object.keys(this.getEventTeams).map(el => el.toLowerCase()).find(el => el === this.teamName.toLowerCase())
      return {
        teamName: !!this.teamName.trim(),
        exist: !exist
      }
    },
    isValid () {
      var validation = this.validateName
      return Object.keys(validation).every((key) => validation[key])
    }
  },
  methods: {
    ...mapActions(['addTeam', 'updateJoinedEventTeam']),
    showAddTeamModal () {
      this.$modal.show('addTeamModal')
    },
    hideModal () {
      this.$modal.hide('addTeamModal')
    },
    cancelAddTeam () {
      this.teamName = ''
      this.desc = ''
      this.head = ''
      this.hideModal()
    },
    addNewTeam () {
      let members = []
      let member = {user: {uid: this.head}}
      members.push(member)
      this.addTeam({name: this.teamName, data: {desc: this.desc, head: this.head}})
      this.updateJoinedEventTeam({teamName: this.teamName, role: 'Head', eventId: this.$route.params.eventId, members})
      this.cancelAddTeam()
    }
  },
  components: {
    TeamTable,
    UnassignedTeamTable
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
