<template>
  <li class="timeline-item">
    <div class="timeline-badge primary"><i class="glyphicon glyphicon-check"></i></div>
    <div class="timeline-panel">
      <div class="timeline-heading">
        <div v-if="!editing && owner && !finished">
          <h4 class="timeline-title">{{ milestone.title }}</h4>
          <button @click="editing = true">Edit</button>
          <button @click="del">Delete</button>
        </div>
        <div v-if="editing">
          <h4>Edit Milestone card</h4>
          <label v-if="!validateForm.title" class="errors">Enter Milestone Title!</label>
          <input type="text" v-model="data.title">
          <button @click="edit" :disabled="!isValid">Confirm</button>
          <button @click="cancel">Cancel</button>
        </div>
        <label v-if="!validateForm.due && editing" class="errors">Due date cannot be before or equal to today.</label>
        <p v-if="!editing"><small class="text-muted"><i class="glyphicon glyphicon-time"></i> {{ milestone.due }}</small></p>
        <p v-if="editing"><small class="text-muted"><i class="glyphicon glyphicon-time"></i><input type="date" v-model="data.due"></small></p>
      </div>
      <div v-if="!editing" class="timeline-body">
        <p>{{ milestone.desc }}</p>
        <p><small class="text-muted"><i class="glyphicon glyphicon-user"></i> {{ milestone.team }}</small></p>
      </div>
      <div v-if="editing" class="timeline-body">
        <label v-if="!validateForm.desc" class="errors">Enter Milestone Description!</label>
        <p><textarea v-model="data.desc"></textarea></p>
        <p>
          <label v-if="!validateForm.team" class="errors">Please select team in charge!</label>
          <small class="text-muted"><i class="glyphicon glyphicon-user"></i>
            <select v-model="data.team" >
              <option v-for="name in getTeamNames" :key="name.key" :value="name">{{ name }}</option>
            </select>
          </small>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'milestoneitem',
  data () {
    return {
      editing: false,
      data: {
        title: '',
        due: '',
        desc: '',
        team: ''
      }
    }
  },
  props: {
    milestone: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: String
    },
    owner: {
      type: Boolean
    },
    finished: {
      type: Boolean
    }
  },
  mounted () {
    this.data.title = this.milestone.title
    this.data.due = this.milestone.due
    this.data.desc = this.milestone.desc
    this.data.team = this.milestone.team
  },
  computed: {
    ...mapGetters(['getTeamNames']),
    isValid () {
      let validation = this.validateForm
      return Object.keys(validation).every((key) => validation[key])
    },
    validateForm () {
      return {
        title: !!this.data.title.trim(),
        desc: !!this.data.desc.trim(),
        due: !!this.data.due.trim() && new Date(this.data.due).getTime() >= new Date().getTime(),
        team: !!this.data.team.trim()
      }
    }
  },
  methods: {
    ...mapActions(['deleteMilestone', 'editMilestone']),
    edit () {
      if (!this.isValid) return

      if (confirm('Are you sure to Edit this card?')) {
        this.editMilestone({
          index: this.index,
          data: this.data
        })
        this.editing = false
      }
    },
    cancel () {
      this.editing = false
      this.data = {
        title: '',
        desc: '',
        due: '',
        team: ''
      }
    },
    del () {
      if (confirm('Are you sure to DELETE this card?')) {
        this.deleteMilestone(this.index)
      }
    }
  }
}
</script>

<style lang="css" scoped>
/* Timeline */
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
.errors {
  color: red;
}
</style>
