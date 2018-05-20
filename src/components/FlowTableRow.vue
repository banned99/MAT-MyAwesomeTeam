<template>
  <tr v-if="!editing">
    <td class="tab-di">{{ flowItem.time }}</td>
    <td class="tab-di">{{ flowItem.task }}</td>
    <td class="tab-di">{{ flowItem.team }}</td>
    <td v-if="owner" class="tab-di"><button class="bt-e-d" @click="editing = true">Edit</button></td>
    <td v-if="owner" class="tab-di"><button class="bt-e-d" @click="del">Delete</button></td>
  </tr>
  <tr v-else>
    <td class="tab-di"><input class="inp time" type="time" v-model="time"></td>
    <td class="tab-di"><input class="inp text" type="text" v-model="task"></td>
    <td class="tab-di">
      <select class="" v-model="team">
        <option class="inp opt" v-for="name in getTeamNames" :key="name.id" :value="name">{{ name[0].toUpperCase() + name.slice(1) }}</option>
      </select>
    </td>
    <td class="tab-di"><button class="bt ok" @click="edit">OK</button></td>
    <td class="tab-di"><button class="bt cc" @click="cancel">Cancel</button></td>
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
      time: '',
      now: 0
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
    },
    isNow () {
      // console.log(this.now)
      let section = new Date(this.date).getTime() + new Date(`1970-01-01T${this.flowItem.time}:00.000Z`).getTime()
      return this.now >= section
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
    },
    owner: {
      type: Boolean
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
      this.editing = false
    },
    del () {
      if (confirm('Are you sure to DELETE this flow?\nThis action cannot be undone.')) {
        this.deleteFlowItem({
          index: new Date(`1970-01-01T${this.flowItem.time}:00.000Z`).getTime(),
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

<style lang="css" scoped>
.bt-e-d {
  background-color: #2979ff;
  color: white;
  border: 0px;
  border-radius: 1em;
}
.inp {
  background-color: rgba(255,255,255,0.2);
  color: #fff;
  border: 0px;
  width: 100%;
}
.tab-di {
  padding: 1em;
}
.bt {
  background-color: #f00;
  color: white;
  border: 0px;
  border-radius: 1em;
}
</style>
