<template>
  <div class="wrapper">
    <h1 class="head-chat">Chat</h1>
    <ul id="chatHistory" v-chat-scroll>
      <ChatTextHistory v-for="message in getChatHistory" :key="message.key" :message="message"/>
    </ul>
    <div class="area-text-send" v-if="!finished">
      <textarea id="inputt" class="inputtext" v-model="textMessage" type="text" autocomplete="off"/>
      <button class="send-button" @click="send" @keypress.enter="send">Send</button>
    </div>
  </div>
</template>

<script>
import ChatTextHistory from '../components/ChatTextHistory'
import { mapGetters, mapActions } from 'vuex'
import ChatVoiceInput from '../components/ChatVoiceInput'

export default {
  name: 'chattextinput',
  data: () => {
    return {
      textMessage: ''
    }
  },
  props: {
    finished: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getUserUID', 'getDisplayName', 'getChatHistory']),
    isMessage () {
      return !!this.textMessage.trim()
    }
  },
  methods: {
    ...mapActions(['sendMessage']),
    send () {
      if (this.isMessage) {
        this.sendMessage({
          uid: this.getUserUID,
          name: this.getDisplayName,
          message: this.textMessage
        })
        this.textMessage = ''
      }
    }
  },
  components: {
    ChatTextHistory, ChatVoiceInput
  }
}
</script>

<style lang="css" scoped>
  .wrapper{
    text-align: center;
  }
  #chatHistory {
    position: relative;
    height: 300px;
    width: 75%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 2em;
    margin: auto;
    border: 1px solid #fff;
    background-color: #fff;
  }
  .inputtext {
    width: 75%;
    color: #000;
    resize: none;
  }
  .head-chat {
    color: #fff;
    font-size: 3rem;
    font-weight: 900;
    padding-bottom: 0.5em;
  }
  .send-button {
    font-weight: bold;
    background-color: #ffa000;
    color: rgba(255,255,255,1);
    width: 25%;
    border: 0px;
  }
  .send-button:active {
    background-color: rgba(0,0,0,0.5);
  }
  .area-text-send {
    display: inline-flex;
    width: 75%;
    padding-top: 1em;
  }
  @media (max-width:420px) {
    #ChatTextHistory {width:90%;}
  }
</style>
