<template>
<div id="voice" v-if="!isFinished">
  <div id="audioContainer" style="display: none;" ></div>
  <div id="streamController">
    <p class="bt" @mousedown="startRec" @mouseup="endRec">&#xf130;</p>
    <button class="bt" @click="mute">Mute Sound</button>
  </div>
</div>
</template>

<script>
import RTCMultiConnection from 'RTCMultiConnection'

export default {
  name: 'chatvoiceinput',
  data: () => {
    return {
      connection: null,
      soundMuted: false
    }
  },
  props: {
    isFinished: {
      type: Boolean
    }
  },
  mounted: function () {
    var eventId = this.$route.params.eventId

    this.connection = new RTCMultiConnection()
    this.connection.autoCloseEntireSession = false
    this.connection.enableLogs = false
    this.connection.dontOverrideSession = true
    this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'

    this.connection.session = {
      audio: true,
      video: false
    }

    this.connection.mediaConstraints = {
      video: false,
      audio: true
    }

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: false
    }

    // this.connection.openOrJoin('444444')
    // this.connection.openOrJoin(eventId, (isRoomExists, roomid) => {
    //   console.log(isRoomExists ? 'You joined room ' + roomid : 'You created room ' + roomid)
    // })

    this.connection.checkPresence(eventId, (isRoomExists, roomid) => {
      if (isRoomExists) {
        this.connection.join(roomid)
      } else {
        this.connection.open(roomid)
      }
    })

    this.connection.onstream = function (event) {
      var audioContainer = document.getElementById('audioContainer')
      if (event.type === 'local') {
        event.stream.mute()
      }
      audioContainer.appendChild(event.mediaElement)
    }

    this.connection.onstreamended = this.connection.onleave = this.connection.onclose = (event) => {
      var audio = document.getElementById(event.streamid)
      if (!audio) return
      audio.parentNode.removeChild(audio)
    }

    this.connection.onmute = function (e) {
      console.log('change icon to muted')
      // console.log(e)
    }

    this.connection.onunmute = function (e) {
      console.log('change icon to unmuted')
      // console.log(e)
    }
  },
  beforeDestroy: function () {
    this.connection.getAllParticipants().forEach((p, index) => {
      this.connection.disconnectWith(p) // optional but suggested
    })
    this.connection.streamEvents.selectFirst().stream.stop()
    this.connection.close()
    this.connection.closeSocket()
    this.connection = null
  },
  methods: {
    startRec: function () {
      this.connection.streamEvents.selectFirst().stream.unmute()
    },
    endRec: function () {
      this.connection.streamEvents.selectFirst().stream.mute()
    },
    mute: function () {
      // this.connection.streamEvents.forEach(function (stream) {
      //   console.log(stream)
      // })
      // console.log(this.connection.peers)
      // console.log(this.connection.peers.getLength())
      // console.log(this.connection.peers.getAllParticipants())
      // console.log(this.connection.peers.selectFirst())
      if (this.soundMuted) this.connection.streamEvents.selectAll('remote').forEach(stream => console.log(stream))
      else this.connection.streamEvents.selectAll('remote').forEach(stream => console.log(stream))
      this.soundMuted = !this.soundMuted
    }
  }
}
</script>

<style scoped>
  .bt {
    display: block;
    font-family: awesome;
    color: #fff;
  }
  .bt:hover {
    cursor:pointer;
    color: rgba(255,255,255,0.8);
  }
</style>
