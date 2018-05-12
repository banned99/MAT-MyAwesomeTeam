<template lang="html">
  <div class="timlim">
    <ul class="timeline" id="timeline">
  <li class="li complete">
    <div class="timestamp">
      <span class="author">Abhi Sharma</span>
      <span class="date">11/15/2014</span>
    </div>
    <div class="status">
      <h4> Shift Created </h4>
    </div>
  </li>
  <li class="li complete">
    <div class="timestamp">
      <span class="author">PAM Admin</span>
      <span class="date">11/15/2014</span>
    </div>
    <div class="status">
      <h4> Email Sent </h4>
    </div>
  </li>
  <li class="li complete">
    <div class="timestamp">
      <span class="author">PAM Admin</span>
      <span class="date">11/15/2014</span>
    </div>
    <div class="status">
      <h4> Email Sent </h4>
    </div>
  </li>
  <li class="li complete">
    <div class="timestamp">
      <span class="author">PAM Admin</span>
      <span class="date">11/15/2014</span>
    </div>
    <div class="status">
      <h4> Email Sent </h4>
    </div>
  </li>
  <li class="li complete">
    <div class="timestamp">
      <span class="author">PAM Admin</span>
      <span class="date">11/15/2014</span>
    </div>
    <div class="status">
      <h4> Email Sent </h4>
    </div>
  </li>
  <li class="li complete">
    <div class="timestamp">
      <span class="author">PAM Admin</span>
      <span class="date">11/15/2014</span>
    </div>
    <div class="status">
      <h4> Email Sent </h4>
    </div>
  </li>
  <li class="li complete">
    <div class="timestamp">
      <span class="author">Aaron Rodgers</span>
      <span class="date">11/15/2014</span>
    </div>
    <div class="status">
      <h4> SIC Approval </h4>
    </div>
  </li>
  <li class="li">
    <div class="timestamp">
      <span class="author">PAM Admin</span>
      <span class="date">TBD</span>
    </div>
    <div class="status">
      <h4> Shift Completed </h4>
    </div>
  </li>
 </ul>
  </div>
</template>

<script>
export default {
  methods: {
    addTimeline: () => {
      console.log('Wakingๆ')
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../assets/css/Flow.sass'
</style>
<style lang="css" scoped>
  @import '../assets/css/bootstrap.css';
</style>
<style lang="css" type="text/css">
.timlim & #timeline & .timeline{
  width: 100%;
  overflow-x: auto;
}
th {
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom:  1px solid white;
}
</style>
