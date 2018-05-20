<template>
  <tr>
    <td>{{ staff.displayName }}</td>
    <td v-if="owner || priority">Team:
      <select v-model="team" name="team">
        <option value="" selected>Choose team</option>
        <option v-for="name in getTeamNames" :key="name.key" :value="name">{{ name[0].toUpperCase() + name.substr(1) }}</option>
      </select>
    </td>
    <td v-if="owner || priority">Role:
      <select v-model="role">
        <option value="Member" selected>Member</option>
        <option value="Sub Head">Sub Head</option>
      </select>
    </td>
    <td v-if="owner">Priority:
      <select v-model="prio" name="prio">
        <option value="false" selected>No</option>
        <option value="true">Yes</option>
      </select>
    </td>
    <td v-if="owner || priority">
      <button :disabled="!isValid" @click="assignStaff">Assign</button>
    </td>
    <td v-if="owner">
      <button @click="kickOut">Kick</button>
    </td>
  </tr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'unassignedteamtablerow',
  data: () => {
    return {
      team: '',
      prio: '',
      role: ''
    }
  },
  props: {
    staff: {
      required: true,
      type: Object
    },
    owner: {
      type: Boolean
    },
    priority: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getTeamNames']),
    validateData () {
      return {
        team: !!this.team.trim(),
        role: !!this.role.trim()
      }
    },
    isValid () {
      let validation = this.validateData
      return Object.keys(validation).every((key) => validation[key])
    }
  },
  methods: {
    ...mapActions(['assignToTeam', 'updateTeam', 'kickStaff', 'leaveEvent']),
    assignStaff () {
      this.assignToTeam({uid: this.staff.uid, team: this.team, prio: this.prio || false, role: this.role})
      this.updateTeam({uid: this.staff.uid, team: this.team, eventId: this.$route.params.eventId, role: this.role})
    },
    kickOut () {
      if (confirm('Are you sure to KICK this staff?\nThis action cannot be undone.')) {
        this.kickStaff({uid: this.staff.uid, team: ''})
        this.leaveEvent({uid: this.staff.uid, eventId: this.$route.params.eventId})
      }
    }
  }
}
</script>

<style>

</style>
