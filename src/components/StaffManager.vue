<template>
  <div>
    <h1 class="lab-head-text">Manage Team & Staffs</h1>
    <TeamTable v-for="(team, index) in getEventTeams" :key="team.key" :team="team" :index="index" :priority="priority" :finished="finished" :owner="owner"/>
    <div class="show-add">
      <button @click="open=true" class="shows" v-if="owner && !finished">ADD</button>
    </div>
    <UnassignedTeamTable :owner="owner" :priority="priority" :finished="finished"/>
    <vue-modaltor  :visible="open" @hide="hideModal" name="addTeamModal" :clickToClose="true">
      <div class="modal-addstaff">
        <h1 class="lab">Add new Team</h1>
        <p v-if="!validateName.teamName" style="color:red">Enter team name!</p>
        <p v-if="!validateName.exist">This team is already exists</p>
        <p class="lab">Team Name</p><input type="text" class="txt-name" v-model="teamName" required placeholder="Team Name">
        <p class="lab">Team Description</p><textarea class="txt-des" v-model="desc" placeholder="Team Description"></textarea>
        <p class="lab">Select Team Head</p>
        <select class="box-select" v-model="head">
          <option v-for="staff in getUnassignedStaffs" :key="staff.key" :value="staff.uid">{{ staff.displayName }}</option>
        </select>
        <div class="box-bt">
          <button class="shows" type="button" @click="addNewTeam()" :disabled="!isValid">Submit</button>
          <button class="shows" type="button" @click="cancelAddTeam()">Cancel</button>
        </div>

      </div>
    </vue-modaltor>
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
  props: {
    owner: {
      type: Boolean
    },
    priority: {
      type: Boolean
    },
    finished: {
      type: Boolean
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

<style lang="css" scoped>
.modal-addstaff {
  text-align: center;
}
.txt-des {
  border: 1px solid black;
  resize: none;
}
.txt-name {
  border: 1px solid black;
  width: 10em;

}
h1 {
  color: white;
}
.show-add {
  text-align: center;
  display: block;
  padding-top: 2em;
  padding-bottom: 3em;
}
.shows {
  background-color: #76ff03;
  border: 0px;
  border-radius: 1em;
  color:black;
  font-weight: 900;
}
.lab {
  font-weight: 900;
}
.lab-head-text{
  text-align: center;
  font-size: 2em;
  font-weight: 900;
}
.box-bt {
  padding-top: 2em;
  display: block;
  text-align: center;
}
.box-select {
    width: 10em;
    background-color: rgba(0,0,0,0.2);
    text-align: center;
}
</style>
