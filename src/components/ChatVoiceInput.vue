<template>
<div id="voice" v-if="!finished">
  <div id="audioContainer" style="display: none;" ></div>
  <div id="streamController">
    <button class="bt" @touchstart="startRec" @touchend="endRec" @mousedown="startRec" @mouseup="endRec">&#xf130;</button>
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
    finished: {
      type: Boolean
    }
  },
  mounted: function () {
    if (!this.finished) {
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
    }
  },
  beforeDestroy: function () {
    this.connection.getAllParticipants().forEach((p, index) => {
      this.connection.disconnectWith(p)
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
    }
  }
}
</script>

<style scoped>
  .bt {
    border-radius: 50%;
    width: 2em;
    background-color: rgba(255,255,255,0.4);
    text-align: center;
    margin: auto;
    font-size: 2em;
    padding: 0.25em;
    display: block;
    font-family: awesome;
    color: #fff;
    cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }
  .bt:hover {
    cursor:pointer;
    color: rgba(255,255,255,0.8);
  }
  .bt:active {
    color: rgba(255,255,255,0.8);
    background-color: rgba(255,0,0,0.8);
  }
  #streamController {
    padding: 1em;
    width: 100%;
    height: 100%;
  }
</style>
