<template>
  <div class="wrapper">
    <p class="head-request">Pending Join Requests</p>
    <RequestListItem v-if="getPendingJoinRequests" v-for="(request, index) in getPendingJoinRequests" :owner="owner" :key="index" :request="request" :index="index" :priority="priority"/>
    <p class="text-nopend" v-if="getPendingJoinRequests.length === 0">
      ---- No pending requests. ----
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RequestListItem from '../components/RequestListItem'

export default {
  name: 'requestdropdown',
  props: {
    owner: {
      type: Boolean
    },
    priority: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getPendingJoinRequests', 'getDisplayName'])
  },
  components: {
    RequestListItem
  }
}
</script>
<style media="screen" scoped>
  p,h2 {
    color: white;
    text-align: center;
  }
  .wrapper {
    width: 70%;
    text-align: left;
    margin: auto;
    padding-bottom: 5em;
  }
  .head-request {
    padding-top: 3em;
    font-size: 2em;
    font-weight: bolder;
  }
</style>
