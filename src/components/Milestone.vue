<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="page-header">
          <h1 class="head-text">Event Milestone</h1>
        </div>
        <div style="display:inline-block;width:100%;overflow-y:auto;">
          <ul class="timeline timeline-horizontal">
            <MilestoneItem v-if="onlyMyTeam" v-for="(milestone, key) in getMyTeamMilestone" :key="key" :milestone="milestone" :index="key" :owner="owner"/>
            <MilestoneItem v-if="!onlyMyTeam" v-for="(milestone, key) in getAllMilestone" :key="key" :milestone="milestone" :index="key" :owner="owner"/>
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
    <button class="bt-submit" @click="show = true" v-if="owner && !finished">Add Milestone</button>
    <button class="bt-blue" v-if="!onlyMyTeam" @click="onlyMyTeam = true">Only my team</button>
    <button class="bt-blue" v-if="onlyMyTeam" @click="onlyMyTeam = false">All team</button>
    <vue-modaltor  :visible="show" @hide="cancel" name="Add Milestone">
      <div class="box-entername">
        <h1 style="text-align:center">Add Milestone</h1>
        <div class="box-title">
          <p>Title</p>
          <p>Description</p>
          <div v-if="!validateForm.title">
            <label class="errors">Title cannot be empty!</label>
            <br>
          </div>
          <input class="in-text" type="text" v-model="title">
        </div>
        <div class="box-desc">
          <p>Description</p>
          <div v-if="!validateForm.desc">
            <label class="errors">Description cannot be empty!</label>
            <br>
          </div>
          <textarea class="in-text" v-model="desc"></textarea>
        </div>
        <div class="box-selteam">
          <p>Select Team: </p>
          <div v-if="!validateForm.team">
            <label class="errors">Select team in charge!</label>
            <br>
          </div>
          <select class="in-text" v-model="team">
            <option v-for="name in getTeamNames" :key="name.id" :value="name">{{ name }}</option>
          </select>
        </div>
        <div class="box-due">
          <p>Due: </p>
          <div v-if="!validateForm.due">
            <label class="errors">Due date cannot be before or equal to today and cannot be after start date.</label>
            <br>
          </div>
          <input class="in-text" type="date" v-model="due">
        </div>
        <div class="box-bt">
          <button class="bt-submit" :disabled="!isValid" @click="submit">Confirm</button>
          <button class="bt-cancel" @click="cancel">Cancel</button>
        </div>
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
  props: {
    owner: {
      type: Boolean
    },
    finished: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getEventMilestone', 'getTeamNames', 'getEventDate', 'getUserTeam']),
    getAllMilestone () {
      return this.sortTaskByDue(this.getEventMilestone)
    },
    getMyTeamMilestone () {
      let myTeamMilestone = {}
      Object.keys(this.getEventMilestone).filter(key => {
        return this.getEventMilestone[key].team === this.getUserTeam(this.$route.params.eventId)
      }).forEach(key => { myTeamMilestone[key] = this.getEventMilestone[key] })
      return this.sortTaskByDue(myTeamMilestone)
    },
    isValid () {
      let validation = this.validateForm
      return Object.keys(validation).every((key) => validation[key])
    },
    validateForm () {
      return {
        title: !!this.title.trim(),
        desc: !!this.desc.trim(),
        due: new Date(this.due).getTime() > new Date().getTime() && new Date(this.due).getTime() <= new Date(this.getEventDate.start).getTime(),
        team: !!this.team.trim()
      }
    }
  },
  methods: {
    ...mapActions(['addMilestone']),
    sortTaskByDue (milestone) {
      let sortedObject = {}
      let originalKeys = Object.keys(milestone)
      let originalValues = Object.values(milestone)
      let sortedValue = originalValues
      sortedValue.sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()).forEach(el => {
        sortedObject[originalKeys[originalValues.findIndex(elem => elem === el)]] = el
      })
      return sortedObject
    },
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

/* Timeline */
.page-header {
  padding-bottom: 0px;
  margin: 0px 0 0px;
  border-bottom: 1px solid #eee;
}
.timeline,
.timeline-horizontal {
  list-style: none;
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
  z-index: 99;
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
  padding: 40px 0px 20px 0px;
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
  margin: 0 auto;
  vertical-align: bottom;
}
.timeline-horizontal .timeline-item .timeline-panel {
  max-height: 400px;
  min-height: 100px;
  overflow-y: scroll;
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
<style lang="css" scoped>
  .box-title {
    font-weight: 900;
    text-align: center;
    padding: 0.5em;
  }
  .box-desc {
    font-weight: 900;
    text-align: center;
    padding: 0.5em;
  }
  .box-selteam {
    font-weight: 900;
    text-align: center;
    padding: 0.5em;
  }
  .box-due {
    font-weight: 900;
    text-align: center;
    padding: 0.5em;
  }
  .in-text {
    font-weight: normal !important;
    border: 0.5px solid rgba(0,0,0,0.5);
  }
  .box-bt {
    text-align: center;
    display: block;
  }
.bt-submit, .bt-cancel{
  font-weight: bold;
  background-color: #ffa000;
  color: rgba(255,255,255,1);
  height: 50px;
  border-radius: 10px;
  border: 0px;
  width: 30%;
}
.bt-submit:active, .bt-cancel:active{
 top:0.1em;
}
.bt-submit:disabled {
  background-color: #949494;
}
.head-text{
  color: #fff;
}
.errors {
  color: red;
}
.bt-blue {
  font-weight: bold;
  background-color: #03a9f4;
  color: rgba(255,255,255,1);
  height: 30px;
  border-radius: 10px;
  border: 0px;
}
</style>
<style media="screen" scoped>
  @import '../assets/css/bootstrap.min.css';
</style>
