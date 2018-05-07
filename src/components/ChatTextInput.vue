<template>
  <div >
    <h2 class="head-chat">Chat</h2>
    <ul id="chatHistory">
      <ChatTextHistory v-for="message in getChatHistory" :key="message.key" :message="message"/>
    </ul>
    <div v-if="!isFinished">
      <textarea class="inputtext" v-model="textMessage" type="text" autocomplete="off"/>
      <button class="send-button" @click="send">Send</button>
    </div>
  </div>
</template>

<script>
import ChatTextHistory from '../components/ChatTextHistory'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'chattextinput',
  data: () => {
    return {
      textMessage: ''
    }
  },
  props: {
    isFinished: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getUserUID', 'getDisplayName', 'getChatHistory'])
  },
  methods: {
    ...mapActions(['sendMessage']),
    send () {
      this.sendMessage({
        uid: this.getUserUID,
        name: this.getDisplayName,
        message: this.textMessage
      })
    }
  },
  components: {
    ChatTextHistory
  }
}
</script>

<style>
  #chatHistory {
    height: 300px;
    width: 100%;
    overflow: auto;
  }
  .inputtext {
    color: #000;
    resize: none;
  }
  .head-chat {
    font-size: 2rem;
    font-weight: 100;
  }
  .send-button {
    color: #000;
  }
</style>
