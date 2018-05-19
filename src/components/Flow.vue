<template>
  <div>
    <div>
      <h1>Flow</h1>
      <FlowTable v-for="(flow, key) in getEventFlow" :key="key" :flow="flow" :date="key"/>
      <button @click="open = true">Add Flow</button>
    </div>
    
    <vue-modaltor  :visible="open" @hide="hide" name="Add Flow">
      <div class="box-entername">
        <h1 style="text-align:center">Add Flow</h1>
        <select v-model="selectedDate">
          <option v-for="date in mapFlowDate" :key="date.key" :value="date">{{ date }}</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Task</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody v-if="!!selectedDate.trim()">
            <tr v-for="value in flow[selectedDate]" :key="value.key">
              <td>{{ value.time }}</td>
              <td>{{ value.task }}</td>
              <td>{{ value.team }}</td>
            </tr>
            <tr>
              <td><input type="time" v-model="time" /></td>
              <td><input type="text" v-model="task" /></td>
              <td>
                <select v-model="team">
                  <option v-for="team in getTeamNames" :key="team.id" :value="team">
                    {{ team[0].toUpperCase() + team.slice(1) }}
                  </option>
                </select>
              </td>
              <td><button @click="push" :disabled="!isValidate">Add</button></td>
            </tr>
          </tbody>
        </table>
        <button @click="submit">Confirm</button>
        <button @click="cancel">Cancel</button>
      </div>
    </vue-modaltor>
  </div>
</template>

<script>
import Modals from '../components/Modals'
import FlowTable from '../components/FlowTable'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'flow',
  data: () => {
    return {
      open: false,
      flow: {},
      selectedDate: '',
      time: '',
      task: '',
      team: ''
    }
  },
  computed: {
    ...mapGetters(['getEventFlow', 'getEventDate', 'getTeamNames']),
    mapFlowDate () {
      let dateArray = this.getDates(this.getEventDate.start, this.getEventDate.end).map(x => x.toLocaleDateString().split('/').join('-'))
      dateArray.forEach(el => {
        if (!this.getEventFlow[el]) {
          this.flow[el] = {}
        } else {
          this.flow[el] = this.getEventFlow[el]
        }
      })
      return dateArray
    },
    isValidate () {
      let validation = this.validateForm
      return Object.keys(validation).every((key) => validation[key])
    },
    validateForm () {
      return {
        time: !!this.time.trim(),
        task: !!this.task.trim(),
        team: !!this.team.trim()
      }
    }
  },
  methods: {
    ...mapActions(['addFlow']),
    hide () {
      this.open = false
      this.cancel()
    },
    cancel () {
      this.open = false
      this.flow = {}
    },
    submit () {
      this.addFlow(this.flow)
      this.cancel()
    },
    getDates (startDate, stopDate) {
      var dateArray = []
      var currentDate = new Date(startDate)
      while (currentDate <= new Date(stopDate)) {
        dateArray.push(currentDate)
        currentDate = this.addDays(currentDate, 1)
      }
      return dateArray
    },
    addDays (startDate, days) {
      var dat = new Date(startDate)
      dat.setDate(dat.getDate() + days)
      return dat
    },
    push () {
      this.flow[this.selectedDate][new Date(`1970-01-01T${this.time}:00.000Z`).getTime()] = {
        time: this.time,
        task: this.task,
        team: this.team
      }
      this.time = ''
      this.task = ''
      this.team = ''
      // console.log(this.flow)
      // this.sortFlow()
    // },
    // sortFlow () {
    //   let sortedFlow = {}
    //   Object.keys(this.flow).map((key, index) => {
    //     sortedFlow[key] = {}
    //     Object.keys(this.flow[key]).map((k, i) => {
    //       var sorted = Object.values(this.flow[key]).sort((a, b) => {
    //         return new Date(`1970-01-01T${a.time}:00.000Z`) - new Date(`1970-01-01T${b.time}:00.000Z`)
    //       })
    //       sortedFlow[key][k] = sorted[i]
    //     })
    //   })
    //   this.flow = sortedFlow
    }
  },
  components: {
    Modals,
    FlowTable
  }
}
</script>

<style scoped>
* {
  color: black;
}
</style>
