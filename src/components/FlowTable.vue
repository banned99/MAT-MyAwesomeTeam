<template>
  <div class="wrap-flow">
    <div class="lab-date-box">
      <h4 class="lab-date">{{ new Date(date).toLocaleDateString() }}</h4>
    </div>
    <div class="bt-del-box">
      <button v-if="owner" class="bt-del" @click="attemptDelete">Delete</button>
    </div>
    <table>
      <thead>
        <tr class="tab-roll">
          <th class="tab-head">Time</th>
          <th class="tab-head">Task</th>
          <th class="tab-head">Team</th>
          <th class="tab-head" colspan="2">Options</th>
        </tr>
      </thead>
      <tbody>
        <FlowTableRow v-for="(flowItem, key) in flow" :key="key" :flowItem="flowItem" :date="date" :owner="owner"/>
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
    },
    owner: {
      type: Boolean
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

<style lang="css" scoped>
.tab-head {
  text-align: center;
  padding: 1em;
}
.tab-roll {
  background-color: rgba(255,255,255,0.4);
}
.bt-del {
  background-color: #ff9800;
  color: white;
  border: 0px;
  border-radius: 2em;
}
.lab-date {
  color: white;
  font-size: 1em;
}
.bt-del-box {
  display: inline-block;
  width: 50%;
  text-align: left;
}
.lab-date-box {
  display: inline-block;
  width: 50%;
  width: 20%
}
</style>
