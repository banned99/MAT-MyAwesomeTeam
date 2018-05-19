<template>
  <tr v-if="!editing">
    <td>{{ flowItem.time }}</td>
    <td>{{ flowItem.task }}</td>
    <td>{{ flowItem.team }}</td>
    <td><button @click="editing = true">Edit</button></td>
    <td><button @click="del">Delete</button></td>
  </tr>
  <tr v-else>
    <td><input type="time" v-model="time"></td>
    <td><input type="text" v-model="task"></td>
    <td>
      <select v-model="team">
        <option v-for="name in getTeamNames" :key="name.id" :value="name">{{ name[0].toUpperCase() + name.slice(1) }}</option>
      </select>
    </td>
    <td><button @click="edit">OK</button></td>
    <td><button @click="cancel">Cancel</button></td>
  </tr>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'flowtablerow',
  data () {
    return {
      editing: false,
      team: '',
      task: '',
      time: ''
    }
  },
  computed: {
    ...mapGetters(['getTeamNames']),
    validateData () {
      return {
        team: !!this.team.trim(),
        task: !!this.task.trim(),
        time: !!this.time.trim()
      }
    },
    isValid () {
      let validation = this.validateData
      return Object.keys(validation).every((key) => validation[key])
    }
  },
  mounted () {
    this.team = this.flowItem.team
    this.task = this.flowItem.task
    this.time = this.flowItem.time
  },
  props: {
    flowItem: {
      required: true,
      type: Object
    },
    date: {
      required: true,
      type: String
    }
  },
  methods: {
    ...mapActions(['editFlowItem', 'deleteFlowItem']),
    edit () {
      this.editFlowItem({
        index: new Date(`1970-01-01T${this.flowItem.time}:00.000Z`).getTime(),
        date: this.date,
        data: {
          team: this.team,
          task: this.task,
          time: this.time
        }
      })
    },
    del () {
      if (confirm('Are you sure to DELETE this flow?\nThis action cannot be undone.')) {
        this.deleteFlowItem({
          index: new Date(`1970-01-01T${this.flowItem.item}:00.000Z`).getTime(),
          date: this.date
        })
      }
    },
    cancel () {
      this.team = this.flowItem.team
      this.task = this.flowItem.task
      this.time = this.flowItem.time
      this.editing = false
    }
  }
}
</script>

<style>

</style>
