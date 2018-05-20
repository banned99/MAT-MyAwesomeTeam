<template>
  <div class="page-team">
    <div class="bb-edit">
      <div class="box-edit-team" v-if="!editing">
        <label class="head-txt">{{ index[0].toUpperCase() + index.substring(1) }}</label>
        <p>{{ team.desc }}</p>
        <button class="bt-edit" @click="editing = true" v-if="(owner || priority) && !finished">Edit {{!finished}}</button>
        <button class="bt-del" @click="deleteATeam()" v-if="owner && !finished">Delete</button>
      </div>
    </div>
    <div v-if="editing">
      <input v-if="owner" type="text" v-model="newTeamName" placeholder="Team Name"> <br>
      <input v-if="owner || priority" type="text" v-model="newTeamDesc" placeholder="Team Description"> <br>
      <button class="bt-edit" @click="editATeam()">Confirm</button>
      <button class="bt-edit" @click="cancelEditTeam()">Cancel</button>
    </div>
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr class="headTr">
              <th>Name</th>
              <th colspan="2">Role</th>
              <th></th>
              <th v-if="owner || priority">Option</th>
              <th></th>
              <th></th>
          </tr>
        </thead>
        </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
    <tbody>
      <TeamTableRow v-if="member !== undefined" v-for="member in team.members" :key="member.key" :member="member" :teamName="index" :owner="owner" :priority="priority" :finished="finished"/>
    </tbody>
  </table>
  </div>

  </div>
</template>

<script>
import TeamTableRow from '../components/TeamTableRow'
import { mapActions, mapGetters } from 'vuex'

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
    },
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
    ...mapGetters(['getUserUID']),
    validateTeamName () {
      return this.team.trim()
    }
  },
  methods: {
    ...mapActions(['editTeam', 'updateJoinedEventTeam', 'deleteTeam']),
    editATeam () {
      if (confirm('Are you sure to UPDATE this team? This action cannot be undone')) {
        this.editTeam({index: this.index, data: {newTeamName: this.newTeamName, newTeamDesc: this.newTeamDesc}})
        this.updateJoinedEventTeam({teamName: this.newTeamName, eventId: this.$route.params.eventId, members: this.team.members})
      }
      this.cancelEditTeam()
    },
    cancelEditTeam () {
      this.newTeamName = ''
      this.newTeamDesc = ''
      this.editing = false
    },
    deleteATeam () {
      if (confirm('Are you sure to DELETE this team? This action cannot be undone')) {
        this.deleteTeam(this.index)
        this.updateJoinedEventTeam({teamName: 'unassigned', eventId: this.$route.params.eventId, members: this.team.members ? this.team.members : []})
      }
      this.cancelEditTeam()
    }
  },
  components: {
    TeamTableRow
  }
}
</script>

<style lang="css" scoped>
.page-team {
  text-align: center;
}
th {
  text-align: center;
}
.bt-edit,.bt-del {
  font-weight: bold;
  background-color: #03a9f4;
  color: rgba(255,255,255,1);
  height: 30px;
  border-radius: 10px;
  border: 0px;
}
.box-edit-team {
  display: block;
  width: 70%;
  margin: auto;
  color: white;
}
.bb-edit {
  padding-bottom: 3em;
  text-align: center;
}
td,th {
  padding-top: 1em;
  padding-bottom: 1em;
}
.headTr {
  font-size: 8px;
}
.head-txt {
  color: white;
  font-size: 2em;
}
</style>
<style lang="css" scoped>
  @import '../assets/css/tablestyle.css';
</style>
