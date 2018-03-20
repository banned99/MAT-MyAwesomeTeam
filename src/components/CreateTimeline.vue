<template lang="html">
  <div class="timeline-item">
    <div class="timeline-item-date">21 <small>DEC</small></div>
    <div class="timeline-item-divider"></div>
    <div class="timeline-item-content">
      <div class="timeline-item-inner">
        <div class="timeline-item-time">12:30</div>
        <div class="timeline-item-title">Title</div>
        <div class="timeline-item-subtitle">Subtitle</div>
        <div class="timeline-item-text">Text</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'createTimeline',
    data: () => {
      return {
        timeline: {
          date: {
            day: '',
            month: ''
          },
          time: '',
          desc: ''
        }
      }
    },
  computed: {
    
  }

}
</script>

<style lang="css">
</style>
