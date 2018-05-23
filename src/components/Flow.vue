<template>
  <div>
    <div>
      <h1 class="lab-head">Flow</h1>
      <FlowTable v-for="(flow, key) in getEventFlow" :key="key" :flow="flow" :date="key" :owner="owner"/>
      <h3 class="lab-h3" v-if="!getEventFlow || Object.keys(getEventFlow).length < 1">No flow right now.</h3>
      <div class="bt-add-flow">
        <button class="bt-op-md" @click="open = true" v-if="owner && !finished">Add Flow</button>
      </div>
    </div>

    <vue-modaltor  :visible="open" @hide="hide" name="Add Flow">
      <div class="box-entername">
        <h1 class="box head" style="text-align:center;">Add Flow</h1>
        <p class="box warn" style="text-align:center;" v-if="selectedDate == ''">Select Date</p>
        <div class="box-select">
          <select class="box select" v-model="selectedDate" placeholder="month/day/year">
            <option class="box opt" v-for="date in mapFlowDate" :key="date.key" :value="date">{{ date }}</option>
          </select>
        </div>
        <table class="box tab">
          <thead>
            <tr v-if="selectedDate != ''">
              <th class="box tab head">Time</th>
              <th class="box tab head">Task</th>
              <th class="box tab head">Team</th>
            </tr>
          </thead>
          <tbody v-if="!!selectedDate.trim()">
            <tr v-for="value in flow[selectedDate]" :key="value.key">
              <td>{{ value.time }}</td>
              <td>{{ value.task }}</td>
              <td>{{ value.team }}</td>
            </tr>

          </tbody>
        </table>
        <div class="tab-input">
        <p class="p-txt">TIME</p>  <input class="box-input" type="time" v-model="time" />
        <p class="p-txt">TASK</p>  <input class="box-input" type="text" v-model="task" />

        <p class="p-txt">TEAM</p>    <select class="box-input" v-model="team">
              <option v-for="team in getTeamNames" :key="team.id" :value="team">
                {{ team[0].toUpperCase() + team.slice(1) }}
              </option>
            </select>
          <button class="bt add" @click="push" :disabled="!isValidate">Add</button>
        </div>
        <div class="box">
          <button class="bt submit" @click="submit">Confirm</button>
          <button class="bt cancel" @click="cancel">Cancel</button>
        </div>
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
  props: {
    owner: {
      type: Boolean
    },
    finished: {
      type: Boolean
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
      this.selectedDate = ''
    },
    cancel () {
      this.open = false
      this.selectedDate = ''
      this.flow = {}
    },
    submit () {
      this.addFlow(this.flow)
      this.cancel()
      this.selectedDate = ''
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
th td {
  text-align: center !important;
  padding: 1em;
}
.bt-op-md{
  background-color: #76ff03;
  border: 0px;
  border-radius: 1em;
  color:black;
  font-weight: 900;
}
.lab-head {
  color: white;
  font-weight: bolder;
  text-align: center;
}
.bt-add-flow {
  display: block;
  padding-bottom: 3em;
  padding-top: 2em;
}
.box {
  text-align: center;
}
.box.select {
  display: block;
  margin: auto;
}
.bt {
  background-color: #ff4000;
  border: 0px;
  border-radius: 1em;
  color:black;
  font-weight: 900;
}
.tab-input{
  width: 100%;
  padding: 1em;
  text-align: center;
  border-top:1px solid black;
}
.box-entername {
  overflow-y: scroll;
  text-align: center;
}
.select{
  background-color: cornsilk;
  color: #000;
}
.box-select {
  padding-bottom: 2em;
}
.box-input {
  background-color: cornsilk;
  color: #000;
}
.bt.add{
  background-color: #2979ff;
  display: block;
  margin: auto;
  margin-top: 1em;
}
.box.warn{
  color:red;
}
.box.tab{
  max-height: 100px;
  overflow-y: hidden;
}
.p-txt {
  margin: 0;
}
.lab-h3{
  color: #fff;
  font-weight: bolder;
}
</style>
