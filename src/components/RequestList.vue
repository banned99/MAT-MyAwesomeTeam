<template>
  <div>
    <h2>Pending Join Requests</h2>
    <RequestListItem v-if="getPendingJoinRequests" v-for="(request, index) in getPendingJoinRequests" :key="index" :request="request" :index="index"/>
    <p v-if="getPendingJoinRequests.length === 0">
      ---- No pending requests. ----
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RequestListItem from '../components/RequestListItem'

export default {
  name: 'requestdropdown',
  computed: {
    ...mapGetters(['getPendingJoinRequests', 'getDisplayName'])
  },
  components: {
    RequestListItem
  }
}
</script>
