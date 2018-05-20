<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="page-header">
          <h1>Event Milestone</h1>
        </div>
        <div style="display:inline-block;width:100%;overflow-y:auto;">
          <ul class="timeline timeline-horizontal">
            <!-- <MilestoneItem v-if="onlyMyTeam" v-for="milestone in getMyTeamMilestone" :key="milestone['.key']" :milestone="milestone"/> -->
            <MilestoneItem v-if="!onlyMyTeam" v-for="(milestone, key) in getEventMilestone" :key="key" :milestone="milestone" :index="key"/>
            <li v-if="Object.keys(getEventMilestone).length < 1" class="timeline-item">
              <div class="timeline-badge primary"><i class="glyphicon glyphicon-check"></i></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4 class="timeline-title">No Task</h4>
                </div>
                <div class="timeline-body">
                  <p>No task right now.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button @click="show = true">Add Milestone</button>
    <vue-modaltor  :visible="show" @hide="cancel" name="Add Milestone">
      <div class="box-entername">
        <h1 style="text-align:center">Add Milestone</h1>
        <label>Title</label>
        <input type="text" v-model="title"> <br>
        <label>Description</label>
        <textarea v-model="desc"></textarea> <br>
        <label>Select Team: </label>
        <select v-model="team">
          <option v-for="name in getTeamNames" :key="name.id" :value="name">{{ name }}</option>
        </select>
        <label>Due: </label>
        <input type="date" v-model="due">
        <button @click="submit">Confirm</button>
        <button @click="cancel">Cancel</button>
      </div>
    </vue-modaltor>
  </div>
</template>

<script>
import MilestoneItem from '../components/MilestoneItem'
import Modals from '../components/Modals'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'milestone',
  data: () => {
    return {
      show: false,
      desc: '',
      team: '',
      title: '',
      due: '',
      onlyMyTeam: false
    }
  },
  computed: {
    ...mapGetters(['getEventMilestone', 'getTeamNames', 'getEventDate'])
    // sortTaskByDue () {
    //   let sortedObject = {}
    //   let originalKeys = Object.keys(this.getEventMilestone)
    //   let originalValues = Object.values(this.getEventMilestone)
    //   let sortedValue = originalValues
    //   sortedValue.sort((a, b) => a.due - b.due).forEach(el => {
    //     sortedObject[originalKeys[originalValues.findIndex(el)]] = el
    //   })
    //   return sortedObject
    // },
    // getMyTeamMilestone () {
    //   let myTeamMilestone = {}
    //   Object.keys(this.getEventMilestone).filter(key => {
    //     return this.getEventMilestone[key].team === this.getUserTeam
    //   }).forEach(key => { myTeamMilestone[key] = this.getEventMilestone[key] })
    //   return myTeamMilestone
    // }
  },
  methods: {
    ...mapActions(['addMilestone']),
    submit () {
      this.addMilestone({
        index: new Date().getTime(),
        data: {
          title: this.title,
          desc: this.desc,
          team: this.team,
          due: this.due
        }
      })
      this.cancel()
    },
    cancel () {
      this.desc = ''
      this.team = ''
      this.title = ''
      this.due = ''
      this.show = false
    }
  },
  components: {
    MilestoneItem,
    Modals
  }
}
</script>

<style scoped>
@import '../assets/css/bootstrap.min.css';
/* Timeline */
.page-header {
  padding-bottom: 0px;
  margin: 0px 0 0px;
  border-bottom: 1px solid #eee;
}
.timeline,
.timeline-horizontal {
  list-style: none;
  padding: 20px;
  position: relative;
}
.timeline:before {
  top: 40px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  background-color: #eeeeee;
  left: 50%;
  margin-left: -1.5px;
}
.timeline .timeline-item {
  margin-bottom: 20px;
  position: relative;
}
.timeline .timeline-item:before,
.timeline .timeline-item:after {
  content: "";
  display: table;
}
.timeline .timeline-item:after {
  clear: both;
}
.timeline .timeline-item .timeline-badge {
  color: #fff;
  width: 54px;
  height: 54px;
  line-height: 52px;
  font-size: 22px;
  text-align: center;
  position: absolute;
  top: 18px;
  left: 50%;
  margin-left: -25px;
  background-color: #333;
  border: 3px solid #ffffff;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
.timeline .timeline-item .timeline-badge i,
.timeline .timeline-item .timeline-badge .fa,
.timeline .timeline-item .timeline-badge .glyphicon {
  top: 2px;
  left: 0px;
}
.timeline .timeline-item .timeline-badge.primary {
  background-color: #1f9eba;
}
.timeline .timeline-item .timeline-badge.info {
  background-color: #5bc0de;
}
.timeline .timeline-item .timeline-badge.success {
  background-color: #59ba1f;
}
.timeline .timeline-item .timeline-badge.warning {
  background-color: #d1bd10;
}
.timeline .timeline-item .timeline-badge.danger {
  background-color: #ba1f1f;
}
.timeline .timeline-item .timeline-panel {
  position: relative;
  width: 46%;
  float: left;
  right: 16px;
  border: 1px solid #777;
  background: #ffffff;
  border-radius: 2px;
  padding: 20px;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
}
.timeline .timeline-item .timeline-panel:before {
  position: absolute;
  top: 26px;
  right: -16px;
  display: inline-block;
  border-top: 16px solid transparent;
  border-left: 16px solid #777;
  border-right: 0 solid #777;
  border-bottom: 16px solid transparent;
  content: " ";
}
.timeline .timeline-item .timeline-panel .timeline-title {
  margin-top: 0;
  color: inherit;
}
.timeline .timeline-item .timeline-panel .timeline-body > p,
.timeline .timeline-item .timeline-panel .timeline-body > ul {
  margin-bottom: 0;
}
.timeline .timeline-item .timeline-panel .timeline-body > p + p {
  margin-top: 5px;
}
.timeline .timeline-item:last-child:nth-child(even) {
  float: right;
}
.timeline .timeline-item:nth-child(even) .timeline-panel {
  float: right;
  left: 16px;
}
.timeline .timeline-item:nth-child(even) .timeline-panel:before {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto;
}
.timeline-horizontal {
  list-style: none;
  position: relative;
  padding: 20px 0px 20px 0px;
  display: inline-block;
}
.timeline-horizontal:before {
  height: 3px;
  top: auto;
  bottom: 26px;
  left: 56px;
  right: 0;
  width: 100%;
  margin-bottom: 20px;
}
.timeline-horizontal .timeline-item {
  display: table-cell;
  height: 280px;
  width: 20%;
  min-width: 320px;
  float: none !important;
  padding-left: 0px;
  padding-right: 20px;
  margin: 0 auto;
  vertical-align: bottom;
}
.timeline-horizontal .timeline-item .timeline-panel {
  top: auto;
  bottom: 64px;
  display: inline-block;
  float: none !important;
  left: 0 !important;
  right: 0 !important;
  width: 100%;
  margin-bottom: 20px;
}
.timeline-horizontal .timeline-item .timeline-panel:before {
  top: auto;
  bottom: -16px;
  left: 28px !important;
  right: auto;
  border-right: 16px solid transparent !important;
  border-top: 16px solid #777 !important;
  border-bottom: 0 solid #777 !important;
  border-left: 16px solid transparent !important;
}
.timeline-horizontal .timeline-item:before,
.timeline-horizontal .timeline-item:after {
  display: none;
}
.timeline-horizontal .timeline-item .timeline-badge {
  top: auto;
  bottom: 0px;
  left: 43px;
}
</style>
