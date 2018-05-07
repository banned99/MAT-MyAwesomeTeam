<template>
  <div class="card">
    <label>From: {{ request.requester.name }}</label>
    <label>Request Date: {{ request.requester.timestamp }}</label>
    <button @click="acceptRequest">Accept</button>
    <button @click="declineRequest">Decline</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'requestlistitem',
  props: {
    request: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getDisplayName', 'getEventToken', 'getEventName', 'getEventDate', 'getEventJoinRequests'])
  },
  methods: {
    ...mapActions(['acceptToJoinRequest', 'declineToJoinRequest', 'addEventFromJoin']),
    acceptRequest: function () {
      let index = this.getEventJoinRequests.indexOf(this.getEventJoinRequests.find(element => this.request.requester.uid === element.requester.uid))
      this.acceptToJoinRequest({
        index: index,
        response: {
          by: this.getDisplayName,
          status: 'accepted',
          timestamp: new Date().toLocaleString()
        },
        request: this.request
      })
      this.addEventFromJoin({
        request: this.request,
        eventToken: this.getEventToken,
        event: {
          name: this.getEventName,
          date: this.getEventDate
        }
      })
    },
    declineRequest: function () {
      let index = this.getEventJoinRequests.indexOf(this.getEventJoinRequests.find(element => this.request.requester.uid === element.requester.uid))
      this.declineToJoinRequest({
        index: index,
        response: {
          by: this.getDisplayName,
          status: 'declined',
          timestamp: new Date().toLocaleString()
        }
      })
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}
</style>

