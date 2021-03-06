<template>
  <tr>
    <td class="tab-text">{{ member.user.name }}</td>
    <td class="tab-text">{{ member.role }}</td>
    <td class="tab-text" v-if="!editing && (owner || priority) && !finished"><button class="bt edit" @click="editing = true">Edit</button></td>
    <td class="tab-text" v-if="editing && owner">Team:
      <select class="sel" v-model="team">
        <option :selected="name === teamName" v-for="name in getTeamNames" :key="name.key" :value="name">{{ name[0].toUpperCase() + name.substr(1)  }}</option>
      </select>
    </td>
    <td class="tab-text" v-if="editing && (owner || priority)">Role:
      <select class="sel" v-model="role">
        <option value="Member" selected>Member</option>
        <option value="Sub Head">Sub Head</option>
      </select>
    </td>
    <td class="tab-text" v-if="editing && owner">Priority:
      <select class="sel" v-model="prio">
        <option value="false" selected>No</option>
        <option value="true">Yes</option>
      </select>
    </td>
    <td v-if="editing"><button class="bt submit" :disabled="!isValid || same" @click="updateStaff()">Submit</button></td>
    <td v-if="editing"><button class="bt edit" @click="cancel()">Cancel</button></td>
    <td v-if="!editing && (owner || priority) && !finished" ><button class="bt unassign" @click="unassign()">Unassign</button></td>
    <td v-if="!editing && owner && !finished" ><button class="bt kick" @click="kickThisUser()">Kick</button></td>
  </tr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'teamtablerow',
  data: () => {
    return {
      editing: false,
      team: '',
      role: '',
      prio: ''
    }
  },
  props: {
    teamName: {
      required: true,
      type: String
    },
    member: {
      required: true,
      type: Object
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
  mounted () {
    this.oldprio = Object.values(this.getEventStaffs).find(el => el.uid === this.member.user.uid).priority
    this.team = this.teamName
    this.role = this.member.role
    this.prio = this.oldprio
  },
  computed: {
    ...mapGetters(['getTeamNames', 'getEventStaffs']),
    validateData () {
      return {
        team: !!this.team.trim(),
        role: !!this.role.trim()
      }
    },
    isValid () {
      let validation = this.validateData
      return Object.keys(validation).every((key) => validation[key])
    },
    same () {
      return this.team === this.teamName && this.role === this.member.role && this.prio === this.oldprio
    }
  },
  methods: {
    ...mapActions(['assignToTeam', 'unassignFromTeam', 'updateTeam', 'kickStaff', 'leaveEvent']),
    updateStaff () {
      this.assignToTeam({uid: this.member.user.uid, team: this.team, prio: this.prio, role: this.role, type: 'updateStaff'})
      this.updateTeam({uid: this.member.user.uid, team: this.team, eventId: this.$route.params.eventId, role: this.role})
      this.cancel()
    },
    unassign () {
      if (confirm('Are you sure to UNASSIGN this member?')) {
        this.unassignFromTeam({uid: this.member.user.uid, team: this.teamName})
        this.updateTeam({uid: this.member.user.uid, team: 'unassigned', eventId: this.$route.params.eventId, role: 'Member'})
      }
    },
    cancel () {
      this.team = this.teamName
      this.role = this.member.role
      this.prio = this.oldprio
      this.editing = false
    },
    kickThisUser () {
      if (confirm('Are you sure to KICK this staff?\nThis action cannot be undone.')) {
        this.kickStaff({uid: this.member.user.uid, team: this.teamName})
        this.leaveEvent({uid: this.member.user.uid, eventId: this.$route.params.eventId})
      }
    }
  }
}
</script>

<style scoped>
a {
  color: white;
}
a:hover {
  color: rgba(255, 0, 0, 0.5);
  cursor: pointer;
}
.bt {
  vertical-align:center;
  text-align: center;
  font-weight: bold;
  background-color: #ffa000;
  color: rgba(255,255,255,1);
  height: 2em;
  border-radius: 10px;
  border: 0px;
  margin: auto;
  font-size: 12px;
}
.bt:disabled {
  background-color: #949494;
}
.tab-text {
  font-size: 12px;
}
.sel {
  background-color: rgba(255,255,255,0.3);
  width:100%;
}
td {
  padding: 0.5em;
}
</style>
