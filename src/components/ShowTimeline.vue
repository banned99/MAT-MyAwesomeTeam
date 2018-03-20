<template lang="html">
  <div id="timeline">
    <div id="timeline-item">
      <div id="timeline-item-date">01 <small>JAN</small></div>
      <div id="timeline-item-divider"></div>
      <div id="timeline-item-content">
        <div id="timeline-item-inner">
          <div id="timeline-item-time">12:30</div>
          <div id="timeline-item-title">พักทานอาหารกลางวัน</div>
          <div id="timeline-item-subtitle">ทีมงานผู้จัดกิจกรรมทุกคน</div>
          <div id="timeline-item-text">พักทานอาหารกลาง</div>
        </div>
      </div>
    </div>
    <br><p><button id="btn" @click="addMilestones" type="button" name="button">+</button></p>
  </div>
</template>
<script type="text/javascript" src="javascript/getRandomColor.js">

</script>
<script>
// The Vue build version to load with the `import` command
import Framework7 from 'framework7'
import Timeline from 'framework7/dist/components/timeline/timeline.js'
import VueTimepicker from 'vue2-timepicker'
Framework7.use([Timeline])

export default {
  name: 'Milestone',
  data: {
    milestone: {
      date: {
        day: '',
        month: ''
      },
      time: '',
      desc: ''
    }

  },
  methods: {
    addMilestones: function () {
      prompt('Press the day', this.timeline.date.day)
      prompt('Press the month', this.timeline.date.month)
      prompt('Press the time', this.tineline.time)
      prompt('Press the desc', this.tineline.desc)
    }
  }
}
</script>

<style lang="css" src="framework7/dist/css/framework7.css">
</style>
<style media="screen">
button#btn {
  width: 10%;
}
#timeline-item{
  justify-content: center;
}
#timeline-item-divider{
  background: red;
}
#timeline-item-divider::after{
  background: #bbb !important;
}
</style>
