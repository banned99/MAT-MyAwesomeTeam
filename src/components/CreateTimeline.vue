<template lang="html">
  <div class="timeline-item">
    <div class="timeline-item-date">{{ milestone.date.day }} <small>{{ milestone.date.month }}</small></div>
    <div class="timeline-item-divider"></div>
    <div class="timeline-item-content">
      <div class="timeline-item-inner">
        <div class="timeline-item-time">{{ milestone.time }}</div>
        <div class="timeline-item-title">{{ milestone.title }}</div>
        <div class="timeline-item-subtitle">{{ milestone.teamconcern }}</div>
        <div class="timeline-item-text">{{ milestone.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'createTimeline',
    data: () => {
      return {
        milestone: {
          title: '',
          date: {
            day: '',
            month: ''
          },
          time: '',
          desc: '',
          teamconcern: []
        }
      }
    },
  computed: {

  }

</script>

<style lang="css">
</style>
