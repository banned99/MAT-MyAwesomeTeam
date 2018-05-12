<template>
  <tr>
    <td>{{ member.user.name }}</td>
    <td>{{ member.role }}</td>
    <td v-if="!editing"><button @click="editing = true">Edit</button></td>
    <td v-if="editing">Team:
      <select v-model="team">
        <option :selected="name === teamName" v-for="name in getTeamNames" :key="name.key" :value="name">{{ name[0].toUpperCase() + name.substr(1)  }}</option>
      </select>
    </td>
    <td v-if="editing">Role:
      <select v-model="role">
        <option value="Member" selected>Member</option>
        <option value="Sub Head">Sub Head</option>
      </select>
    </td>
    <td v-if="editing">Priority:
      <select v-model="prio">
        <option value="false" selected>No</option>
        <option value="true">Yes</option>
      </select>
    </td>
    <td v-if="editing"><button :disabled="!isValid || same" @click="updateStaff()">Submit</button></td>
    <td v-if="editing"><button @click="cancel()">Cancel</button></td>
    <td v-if="!editing"><button @click="unassign()">Unassign</button></td>
    <td v-if="!editing"><button @click="kickThisUser()">Kick</button></td>
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
      this.unassignFromTeam({uid: this.member.user.uid, team: this.teamName})
      this.updateTeam({uid: this.member.user.uid, team: 'unassigned', eventId: this.$route.params.eventId, role: 'Member'})
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
</style>
