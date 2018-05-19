<template>
  <div>
    <h4>{{ new Date(date).toLocaleDateString() }}</h4> <button @click="attemptDelete">Delete</button>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Task</th>
          <th>Team</th>
          <th colspan="2">Options</th>
        </tr>
      </thead>
      <tbody>
        <FlowTableRow v-for="(flowItem, key) in flow" :key="key" :flowItem="flowItem" :date="date"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import FlowTableRow from '../components/FlowTableRow'
import { mapActions } from 'vuex'

export default {
  name: 'flowtable',
  props: {
    flow: {
      required: true,
      type: Object
    },
    date: {
      type: String
    }
  },
  components: {
    FlowTableRow
  },
  methods: {
    ...mapActions(['deleteFlowByDate']),
    attemptDelete () {
      if (confirm('Are you sure to DELETE this flow?\nThis action cannot be undone.')) {
        this.deleteFlowByDate(this.date)
      }
    }
  }
}
</script>

<style>

</style>
