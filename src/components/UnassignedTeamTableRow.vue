<template>
  <tr>
    <td class="tab-name">{{ staff.displayName }}</td>
    <td>Team:
      <select class="sel" v-model="team" name="team">
        <option value="" selected>Choose team</option>
        <option v-for="name in getTeamNames" :key="name.key" :value="name">{{ name[0].toUpperCase() + name.substr(1) }}</option>
      </select>
    </td>
    <td>Role:
      <select class="sel" v-model="role">
        <option value="Member" selected>Member</option>
        <option value="Sub Head">Sub Head</option>
      </select>
    </td>
    <td>Priority:
      <select class="sel" v-model="prio" name="prio">
        <option value="false" selected>No</option>
        <option value="true">Yes</option>
      </select>
    </td>
    <td>
      <button class="bt" :disabled="!isValid" @click="assignStaff">Assign</button>
    </td>
    <td>
      <button class="bt" @click="kickOut">Kick</button>
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
    }
  },
  computed: {
    ...mapGetters(['getTeamNames']),
    validateData () {
      return {
        team: !!this.team.trim(),
        prio: !!this.prio.trim(),
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
      this.assignToTeam({uid: this.staff.uid, team: this.team, prio: this.prio, role: this.role})
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

<style lang="css" scoped>
.sel {
  width: 100%;
  font-size: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}
.tab-name{
  padding-right: 1em;
}
.bt {
  font-weight: bold;
  background-color: #03a9f4;
  color: rgba(255,255,255,1);
  height: 30px;
  border-radius: 10px;
  border: 0px;
}
</style>
