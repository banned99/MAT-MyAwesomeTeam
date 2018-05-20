<template>
  <div class="card">
    <div class="big-box">
      <label>From: {{ request.requester.name }}</label>
      <label>Request Date: {{ request.requester.timestamp }}</label>
    </div>
    <div class="bb-box">
      <div class="bt-box" v-if="owner || priority">
        <button class="bt" @click="acceptRequest">Accept</button>
        <div class="space"></div>
        <button class="bt" @click="declineRequest">Decline</button>
      </div>
    </div>
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
    },
    owner: {
      type: Boolean
    },
    priority: {
      type: Boolean
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
  width: 100%;
  color: #fff;
  display: block;
  margin: 10px;
  padding: 10px;
  border-bottom: 2px solid white;
}
.bt {
  background-color: #29b6f6;
  color: #fff !important;
  border: 0;
  padding: 1px;
}
.space {
  width: 10px;
}
.bb-box {
  text-align: right !important;
}
.bt-box {
  display: inline-flex;
}
.big-box {
  display:inline-block;
}
</style>
