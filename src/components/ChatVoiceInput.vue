<template>
<div id="voice">
  <div id="audioContainer" ></div>
  <div id="streamController">
    <button @mousedown="startRec" @mouseup="endRec">Push to talk</button>
    <button @click="mute">Mute Sound</button>
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
  computed: {
  },
  mounted: function () {
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

    this.connection.checkPresence('444444455544444', (isRoomExists, roomid) => {
      if (isRoomExists) {
        this.connection.join(roomid)
        // this.connection.rejoin(roomid)
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
      console.log(event)
    }

    // this.connection.onmute = function (e) {
    //   console.log('change icon to muted')
    //   console.log(e)
    // }

    // this.connection.onunmute = function (e) {
    //   console.log('change icon to unmuted')
    //   console.log(e)
    // }

    console.log(this.connection)
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
      console.log(this.connection.peers)
      console.log(this.connection.peers.getLength())
      console.log(this.connection.peers.getAllParticipants())
      console.log(this.connection.peers.selectFirst())
      // if (this.soundMuted) this.connection.streamEvents.selectAll('remote').unmute()
      // else this.connection.streamEvents.selectAll('remote').mute()
      // this.soundMuted = !this.soundMuted
    }
  }
}
</script>

<style>

</style>
