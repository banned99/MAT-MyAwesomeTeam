<template>
  <tr>
    <td>{{ member.user.name }}</td>
    <td>{{ member.role }}</td>
<<<<<<< HEAD
    <td v-if="!editing"><a @click="editing = true">Edit</a></td>
    <td v-if="editing">Team: <select name="team"><option v-for="(team, index) in teams" :key="team.key" :value="index">{{ index }}</option></select></td>
    <td v-if="editing">Priority:
      <select name="prio">
=======
    <td v-if="!editing"><button @click="editing = true">Edit</button></td>
    <td v-if="editing">Team: 
      <select name="team">
        <option v-for="(team, index) in teams" :key="team.key" :value="index">{{ index }}</option>
      </select>
    </td>
    <td v-if="editing">Priority: 
      <select v-model="memberData.prio" name="prio">
>>>>>>> 32401d70885122bcd15b43a6430b54238675618e
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </td>
    <td v-if="editing"><button @click="updateStaff()">Submit</button></td>
    <td v-if="editing"><button @click="cancel()">Cancel</button></td>
<<<<<<< HEAD
    <td v-if="!editing"><a @click="kickThisUser()">Kick</a></td>
=======
    <td v-if="!editing"><button @click="kickThisUser()">Kick</button></td>
    <td></td>
>>>>>>> 32401d70885122bcd15b43a6430b54238675618e
  </tr>
</template>

<script>
export default {
  name: 'teamtablerow',
  data: () => {
    return {
      editing: false,
      teams: {
        eventheads: 'event heads',
        entertainers: 'entertainers',
        unassigned: 'unassigned'
      },
      memberData: {
        prio: '',
        team: '',
        role: ''
      }
    }
  },
  props: {
    member: {
      required: true,
      type: Object
    }
  },
  methods: {
    updateStaff () {
      console.log('test')
    },
    cancel () {
      this.editing = false
      console.log('cancel')
    },
    kickThisUser () {
      console.log('kick')
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
