<template>
  <div>
    <h1>Manage Team & Staffs</h1>
    <TeamTable v-for="(team, index) in getEventTeams" :key="team.key" :team="team" :index="index"/>
    <UnassignedTeamTable />
    <vue-modaltor  :visible="open" @hide="hideModal" name="addTeamModal" :clickToClose="true">
      <div class="modal-addstaff">
        <h1>Add new Team</h1>
        <p v-if="!validateName.teamName">Enter team name!</p>
        <p v-if="!validateName.exist">This team is already exists</p>
        <label>Team Name: </label><input type="text" class="txt-name" v-model="teamName" required placeholder="Team Name"> <br>
        <label>Team Description: </label><textarea class="txt-des" v-model="desc" placeholder="Team Description"></textarea><br>
        <label>Select Team Head</label>
        <select v-model="head">
          <option v-for="staff in getUnassignedStaffs" :key="staff.key" :value="staff.uid">{{ staff.displayName }}</option>
        </select>
        <button type="button" @click="addNewTeam()" :disabled="!isValid">Submit</button>
        <button type="button" @click="cancelAddTeam()">Cancel</button>
      </div>
    </vue-modaltor>
    <button @click="open=true" class="show">ADD</button>
  </div>
</template>

<script>
import TeamTable from '../components/TeamTable'
import UnassignedTeamTable from '../components/UnassignedTeamTable'
import { mapGetters, mapActions } from 'vuex'
import Modals from '../components/Modals'

export default {
  name: 'staffmanager',
  data () {
    return {
      teamName: '',
      desc: '',
      head: '',
      open: false
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
    hideModal () {
      this.open = false
      this.resetForm()
    },
    cancelAddTeam () {
      this.hideModal()
      this.resetForm()
    },
    resetForm () {
      this.teamName = ''
      this.desc = ''
      this.head = ''
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
    UnassignedTeamTable,
    Modals
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
